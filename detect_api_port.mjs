import  { spawn } from 'child_process';

const containerName = 'trueblocks';

// This command will print string like 0.0.0.0:8090->80/tcp
// which means [IP address of the container]:[container port] -> [port inside of the container]/[protocol]
// We want it this way, so that it is easier to parse
const command = ['docker', ['ps', `-f name=${containerName}`, `--format='{{.Ports}}'`]];

function spawnDockerCommand() {
    return spawn(...command);
}

// Because we can read stdout and stderr through pipes only, we need to bind some functions to pipe events
function bindListeners(process, { onData, onError, onClose }) {
    process.stdout.on('data', onData);
    process.stderr.on('data', onError);
    process.on('close', onClose);
}

// This gets the port number
function parseCommandOutput(output) {
    return output.replace(/.+:([\d]{4}).+/, '$1').trim();
}

// Runs docker command and binds events to pipes (stdout and stderr)
function executeCommand() {
    const dockerCommandProcess = spawnDockerCommand();

    return new Promise((resolve, reject) => {
        bindListeners(dockerCommandProcess, {
            onData(data) {
                resolve(data.toString());
            },
            onError(error) {
                reject(error.toString());
            },
            onClose() {
                reject(new Error('Cannot read port number - is API container running?'));
            }
        });
    });
}

async function detectPort() {
    const commandOutput = await executeCommand();
    const port = parseCommandOutput(commandOutput);

    return port;
}

(async () => {
    try {
        const port = await detectPort();
        console.log(port);
    } catch (e) {
        throw new Error(`Error while getting API port ${e}`);
    }
})();
