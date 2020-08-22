const pathToFileURL = require('url').pathToFileURL;
const path = require('path');

module.exports = {
  /**
   * Locates the UI and returns the URL to it. Should return react dev server URL
   * in development mode, or a file:// path to the built index.html
   * @param {boolean} developmentMode - true if in development mode.
   */
  getUiUrl(developmentMode) {
    if (developmentMode) {
      const url = process.env.ELECTRON_UI_URL;

      if (!url) throw new Error('Missing environment variable ELECTRON_UI_URL');

      return process.env.ELECTRON_UI_URL;
    }

    return pathToFileURL(path.join(__dirname, '../build/index.html')).toString();
  }
};
