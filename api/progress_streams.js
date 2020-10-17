const webSockets = require('./websockets');

function onData(routeName) {
  return function onDataListener(stream) {
    if (routeName !== 'export') return;

    const outputString = stream.toString();
    const values = getProgress(outputString);

    if (!values) return;

    webSockets.reportProgress('export', { finished: false, ...values });
  };
}

function onFinish(routeName) {
  return function onFinishListener(stream) {
    if (routeName !== 'export') return;

    webSockets.reportProgress('export', { finished: true });
  };
}

function getProgress(string) {
  const match = string.match(/\:([A-Za-z|\s]+)([\d]+) of.*([\d]+)/);
  if (match) {
    let [, op, done, total] = match;
    op = string.trim(op);
    return { op, done, total };
  }
  return;
}

module.exports = {
  bindEvents(stderr, { routeName }) {
    stderr.on('data', onData(routeName));
    stderr.on('end', onFinish(routeName));
    stderr.on('error', onFinish(routeName));
  },
};
