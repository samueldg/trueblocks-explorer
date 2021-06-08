import path from 'path';
import {pathToFileURL} from 'url';

export {readEnvFile} from '../common/readEnvFile';

/**
 * Locates the UI and returns the URL to it. Should return react dev server URL
 * in development mode, or a file:// path to the built index.html
 * @param developmentMode - true if in development mode.
 */
interface GetUiUrl {
  developmentMode: boolean;
  developmentUrl: string;
  productionAssetDirectory: string;
}

export function getUiUrl({developmentMode, developmentUrl, productionAssetDirectory}: GetUiUrl): string {
  if (developmentMode) {
    return developmentUrl;
  }

  return pathToFileURL(path.join(__dirname, '../../', productionAssetDirectory, 'index.html')).toString();
}
