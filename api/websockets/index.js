const progressModule = require('./progress');
const webSockets = require('./websockets');

module.exports = {
  reportProgress: progressModule.createReportProgress(webSockets),
  ...webSockets
};
