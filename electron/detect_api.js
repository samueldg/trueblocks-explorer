const net = require('net');
const client = new net.Socket();

module.exports = {
  detectApi(port) {
    console.log('[detectApi] detecting...');

    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        console.log('[detectApi] api NOT detected...');
        resolve(false);
      }, 250);

      client.on('error', (error) => resolve(false));
      client.connect({ port }, () => {
        client.end();
        console.log('[detectApi] detected...');
        clearTimeout(timeout);
        resolve(true);
      });
    });
  }
};
