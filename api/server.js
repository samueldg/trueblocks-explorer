const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require('child_process');
const fs = require('fs');
const ws = require('ws');

const app = express();

//------------------------------------------------------------------
const apiOptions = require('./api_options.json');
let env = process.env;
env.API_MODE = true;
env.NO_COLOR = true;
if (fs.existsSync('/tmp/test-api')) {
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

//------------------------------------------------------------------
let processList = [];
let cmdCount = 0;

//------------------------------------------------------------------
// function log(...args) {
//   const head = '-API: ';
//   console.log.apply(null, [head, ...args]);
// }

//------------------------------------------------------------------
const getCommandLine = (routeName, queryObj) => {
  let cmd = Object.entries(queryObj)
    .map(([key, val]) => {
      let option = apiOptions[routeName][key];
      let cmdString = [];
      if (option === undefined) {
        // console.log.apply(null, '\x1b[31m', 'apiOption[' + routeName + '][' + key + '] not found', '\x1b[0m');
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
    //console.log(msg);
    return res.send(msg);
  }

  let cmd = getCommandLine(routeName, req.query);
  let chifra = spawn('chifra', [routeName, cmd], {env: env, detached: true});

  cmdCount++;
  console.log(`-API: -------------- ${cmdCount} ---------------------------`);
  console.log(
    ~~(Date.now() / 1000) + ' ~ \x1b[32m\x1b[1m<INFO>\x1b[0m  : ' + `API calling \'chifra ${routeName} ${cmd}\'`
  );

  req.on('close', (err) => {
    //console.log(`killing ${-chifra.pid}...`);
    try {
      process.kill(-chifra.pid, 'SIGINT');
    } catch (e) {
      //console.log(`error killing process: ${e}`);
    }
    removeFromProcessList(chifra.pid);
    return false;
  });

  processList.push({pid: chifra.pid, cmd: `chifra ${routeName} ${cmd}`});
  //console.log(processList);
  chifra.stderr.pipe(process.stderr);
  chifra.stdout.pipe(res).on('finish', (code) => {
    removeFromProcessList(chifra.pid);
    console.log(`-API: Exiting route ${routeName} with ${code === undefined ? 'OK' : code}`);
    console.log(`-API: -------------- ${cmdCount} ---------------------------`);
    console.log(' ');
    res.send();
  });
  bindEvents(chifra.stderr, {routeName});
});

//------------------------------------------------------------------
function onData(routeName) {
  return function onDataListener(stream) {
    if (routeName !== 'export') return;

    const outputString = stream.toString();
    const values = getProgress(outputString);

    if (!values) return;

    reportProgress('export', {finished: false, ...values});
  };
}

//------------------------------------------------------------------
function onFinish(routeName) {
  return function onFinishListener(stream) {
    if (routeName !== 'export') return;

    reportProgress('export', {finished: true});
  };
}

//------------------------------------------------------------------
function getProgress(string) {
  const match = string.match(/:([A-Za-z|\s]+) .*([\d]+) of .*([\d]+)/);
  if (match) {
    let [, op, done, total] = match;
    op = string.trim(op);
    return {op, done, total};
  }
  return;
}

//------------------------------------------------------------------
function bindEvents(stderr, {routeName}) {
  stderr.on('data', onData(routeName));
  stderr.on('end', onFinish(routeName));
  stderr.on('error', onFinish(routeName));
}

//------------------------------------------------------------------
function reportProgress(id, progress) {
  broadcast({action: 'progress', id, progress});
}

//------------------------------------------------------------------
const listeners = [];

//------------------------------------------------------------------
function reportConnectedCount() {
  console.log('-API: sockets connected', server.clients.size);
}

//------------------------------------------------------------------
function bindSocketEvents(socket) {
  socket.on('close', (code, reason) => {
    console.log('-API: socket closing', code, reason);
    reportConnectedCount();
  });
  socket.on('message', (message) => {
    console.log('-API: incoming message:', message);
    listeners.forEach((listener) => listener(message, socket));
  });
  socket.on('error', (error) => {
    console.error('Websockets error:', error);
  });
}

//------------------------------------------------------------------
function bindServerEvents(server) {
  server.on('listening', () => console.log('-API: server ready'));
  server.on('connection', (socket) => {
    console.log('-API: socket connected');
    reportConnectedCount();
    bindSocketEvents(socket);
  });
}

//------------------------------------------------------------------
function createServer(httpInstance) {
  server = new ws.Server({
    server: httpInstance,
    clientTracking: true,
    path: '/websocket',
  });
  bindServerEvents(server);
  return server;
}

//------------------------------------------------------------------
function broadcast(message, sendRaw = false) {
  const messageToSend = sendRaw ? message : JSON.stringify(message);
  [...server.clients].filter(({readyState}) => readyState === ws.OPEN).forEach((socket) => socket.send(messageToSend));
}

//------------------------------------------------------------------
// function addMessageListener(listener) {
//   listeners.push(listener);
// }

//------------------------------------------------------------------
const port = !isNaN(process.argv[2]) ? process.argv[2] : 8080;
let server = app.listen(port, () => {
  console.log('TrueBlocks Data API (version 0.8.4-alpha) initialized on port ' + port);
});

//------------------------------------------------------------------
createServer(server);
