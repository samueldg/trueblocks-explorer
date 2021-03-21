import { config } from 'dotenv-safe';
import { DotenvParseOutput } from 'dotenv';

const envConfig = config();

/**
 * Returns constants defined in .env file
 */
interface EnvConfiguration extends DotenvParseOutput {
    DEV_UI_URL: string,
    PRODUCTION_ASSET_DIRECTORY: string,
}

export function readEnvFile(): EnvConfiguration {
    return envConfig.parsed as EnvConfiguration;
}
