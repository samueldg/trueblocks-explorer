const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const fs = require('fs');

//------------------------------------------------------------------
const streamEvents = require('./progress_streams');
const webSockets = require('./websockets');

const app = express();

//------------------------------------------------------------------
const apiOptions = require('./api_options.json');
let env = process.env;
env.API_MODE = true;
env.NO_COLOR = true;
if (fs.existsSync('./testing')) {
  env.TEST_MODE = true;
  console.log('Running in test mode');
}

//------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.use('/help', express.static(__dirname + '/help'));
app.use('/docs', express.static(__dirname + '/docs'));
app.use('/', express.static(__dirname + '/build'));

let processList = [];
let cmdCount = 0;
var DEBUG = false;

//------------------------------------------------------------------
function debug_log(...args) {
  if (DEBUG) {
    console.log.apply(null, [...args]);
  }
}

//------------------------------------------------------------------
function log(...args) {
  const head = '-API: ';
  console.log.apply(null, [head, ...args]);
}

//------------------------------------------------------------------
const getCommandLine = (routeName, queryObj) => {
  let cmd = Object.entries(queryObj)
    .map(([key, val]) => {
      let option = apiOptions[routeName][key];
      let cmdString = [];
      if (option === undefined) {
        debug_log('\x1b[31m', 'apiOption[' + routeName + '][' + key + '] not found', '\x1b[0m');
        cmdString.push(`--${key}`, val);
      } else if (option.option_kind === 'positional') {
        cmdString.push(val);
      } else if (option.option_kind === 'switch') {
        cmdString.push(`--${key}`);
      } else {
        cmdString.push(`--${key}`, val);
      }
      return cmdString;
    })
    .reduce((acc, val) => acc.concat(val), [])
    .join(' ');

  return cmd;
};

//------------------------------------------------------------------
const removeFromProcessList = (pid) => {
  processList = processList.filter((process) => process.pid !== pid);
};

//------------------------------------------------------------------
app.get(`/ps`, (req, res) => {
  // if(req.query.kill !== undefined) {
  //     console.log("killing ", req.query.kill)
  // }
  res.send(processList);
});

//------------------------------------------------------------------
app.get(`/log-message`, (req, res) => {
  console.log(JSON.stringify(req.query));
  res.send('');
});

//------------------------------------------------------------------
app.get(`/ping`, (req, res) => {
  res.send(JSON.stringify(req.query));
});

//------------------------------------------------------------------
app.get(`/:routeName`, (req, res) => {
  let routeName = req.params.routeName;
  if (apiOptions[routeName] === undefined) {
    var msg = '{ "errors": [ "JS API: Route ';
    msg += routeName;
    msg += ' is not available." ] }';
    debug_log(msg);
    return res.send(msg);
  }

  let cmd = getCommandLine(routeName, req.query);
  let chifra = spawn('chifra', [routeName, cmd], { env: env, detached: true });

  cmdCount++;
  console.log(`-API: -------------- ${cmdCount} ---------------------------`);
  console.log(
    ~~(Date.now() / 1000) + ' ~ \x1b[32m\x1b[1m<INFO>\x1b[0m  : ' + `API calling \'chifra ${routeName} ${cmd}\'`
  );

  req.on('close', (err) => {
    debug_log(`killing ${-chifra.pid}...`);
    try {
      process.kill(-chifra.pid, 'SIGINT');
    } catch (e) {
      debug_log(`error killing process: ${e}`);
    }
    removeFromProcessList(chifra.pid);
    return false;
  });

  processList.push({ pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}` });
  debug_log(processList);
  chifra.stderr.pipe(process.stderr);
  chifra.stdout.pipe(res).on('finish', (code) => {
    removeFromProcessList(chifra.pid);
    log(`Exiting route ${routeName} with ${code === undefined ? 'OK' : code}`);
    console.log(`-API: -------------- ${cmdCount} ---------------------------`);
    console.log(' ');
    res.send();
  });
  streamEvents.bindEvents(chifra.stderr, { routeName });
});

//------------------------------------------------------------------
app.put(`/settings`, (req, res) => {
  const routeName = 'settings';
  debug_log(req.query);
  if (req.query.set !== undefined) {
    debug_log(`setting env CONFIG_SET to...\n${JSON.stringify(req.body)}`);
    env.CONFIG_SET = JSON.stringify(req.body);
  }

  let cmd = getCommandLine(routeName, req.query);
  let chifra = spawn('chifra', [routeName, cmd], { env: env, detached: true });

  cmdCount++;
  console.log(`-API: -------------- ${cmdCount} ---------------------------`);
  console.log(
    ~~(Date.now() / 1000) + ' ~ \x1b[32m\x1b[1m<INFO>\x1b[0m  : ' + `API calling \'chifra ${routeName} ${cmd}\'`
  );

  processList.push({ pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}` });
  debug_log(processList);

  req.on('close', (err) => {
    debug_log(`killing ${-chifra.pid}...`);
    try {
      process.kill(-chifra.pid, 'SIGINT');
    } catch (e) {
      debug_log('completed'); //`error killing process: ${e}`)
    }
    removeFromProcessList(chifra.pid);
    return false;
  });
  chifra.stderr.pipe(process.stderr);
  chifra.stdout.pipe(res).on('finish', (code) => {
    removeFromProcessList(chifra.pid);
    log(`Exiting route ${routeName} with ${code === undefined ? 'OK' : code}`);
    console.log(`-API: -------------- ${cmdCount} ---------------------------`);
    console.log(' ');
    res.send();
  });
});

// TODO(tjayrush): This code should notice the lack of a path but allow the API to run anyway. All requests
// TODO(tjayrush): to the API should return an error to the requestor instead of refusing to run.
/*
let thePath = '';
const paths = env.PATH.split(':');
if (paths) {
  const array = paths.map((path) => {
    return path;
  });
  if (array) {
    const tb = array.filter((item) => {
      return item.includes('trueblocks-core/bin') && !item.includes('/test');
    });
    if (tb.length !== 1) {
      console.log(
        '\n    \x1b[31m\x1b[1m%s\x1b[0m\x1b[33m\x1b[1m %s\x1b[0m',
        'Error:',
        'The API cannot find a $PATH to ./trueblocks-core/bin/chifra. Quitting...\n'
      );
      return;
    } else {
      //console.log('chifra found at: ' + tb[0] + '/chifra');
      thePath = tb[0] + '/chifra';
      try {
        if (fs.existsSync(thePath)) {
          //file exists
        } else {
          console.log(
            '\n    \x1b[31m\x1b[1m%s\x1b[0m\x1b[33m\x1b[1m %s\x1b[0m',
            'Error:',
            'The command file (' + thePath + ') was not found. Quitting...\n'
          );
          return;
        }
      } catch (err) {
        console.log(
          '\n    \x1b[31m\x1b[1m%s\x1b[0m\x1b[33m\x1b[1m %s\x1b[0m',
          'Error:',
          'The chifra file was not found. ' + err + '\n'
        );
        return;
      }
    }
  }
}
*/

const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
const server = app.listen(port, () => {
  console.log('TrueBlocks Data API (version 0.8.1-alpha) initialized on port ' + port);
});

webSockets.createServer(server);
