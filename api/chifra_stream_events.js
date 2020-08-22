const webSockets = require('./websockets');
const exportOutputParser = require('./output_parsers/export');

function onData(routeName) {
    return function onDataListener(stream) {
        if (routeName !== 'export') return;

        const outputString = stream.toString();
        const values = exportOutputParser.getProgress(outputString);

        if (!values) return;

        webSockets.reportProgress('export', { finished: false, ...values });
    }
}

function onFinish(routeName) {
    return function onFinishListener(stream) {
        if (routeName !== 'export') return;

        webSockets.reportProgress('export', { finished: true });
    }
};

module.exports = {
    bindEvents(stderr, { routeName }) {
        stderr.on('data', onData(routeName));
        stderr.on('end', onFinish(routeName));
        stderr.on('error', onFinish(routeName));
    }
}
