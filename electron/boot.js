const exec = require('child_process').exec;
const path = require('path');

const apiEntrypoint = path.resolve(__dirname, '../api/server.js');

module.exports = function boot() {
  console.log('[boot] booting api');
  exec(`node ${apiEntrypoint}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`api error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`api stderr: ${stderr}`);
      return;
    }

    console.log(`api stdout: ${stdout}`);
  });
};
