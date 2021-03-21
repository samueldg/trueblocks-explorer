"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnvFile = void 0;
const dotenv_safe_1 = require("dotenv-safe");
const envConfig = dotenv_safe_1.config();
function readEnvFile() {
    return envConfig.parsed;
}
exports.readEnvFile = readEnvFile;
