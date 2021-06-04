import { DotenvParseOutput } from 'dotenv';
import { config } from 'dotenv-safe';

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
