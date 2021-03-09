import { pathToFileURL } from 'url';
import path from 'path';
import { config } from 'dotenv-safe';
import { DotenvParseOutput } from 'dotenv';

const envConfig = config();

/**
 * Returns constants defined in .env file
 */
interface EnvConfiguration extends DotenvParseOutput{
  DEV_UI_URL: string,
  PRODUCTION_ASSET_DIRECTORY: string,
}

export function readEnvFile(): EnvConfiguration {
  return envConfig.parsed as EnvConfiguration;
}

/**
 * Locates the UI and returns the URL to it. Should return react dev server URL
 * in development mode, or a file:// path to the built index.html
 * @param developmentMode - true if in development mode.
 */
interface GetUiUrl {
  developmentMode: boolean,
  developmentUrl: string,
  productionAssetDirectory: string,
}

export function getUiUrl(
  { developmentMode, developmentUrl, productionAssetDirectory }: GetUiUrl,
): string {
  if (developmentMode) {
    return developmentUrl;
  }

  return pathToFileURL(path.join(__dirname, '../../', productionAssetDirectory, 'index.html')).toString();
}
