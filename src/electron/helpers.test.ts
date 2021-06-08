const Helpers = require('./helpers');

describe('getUiUrl', () => {
  it('returns correct development URL', () => {
    const developmentUrl = 'localhost:1234';

    const result = Helpers.getUiUrl({
      developmentMode: true,
      developmentUrl,
      productionAssetDirectory: '',
    });

    expect(result).toBe(developmentUrl);
  });

  it('returns correct path for producion build', () => {
    const productionAssetDirectory = 'dist';

    const result = Helpers.getUiUrl({
      developmentMode: false,
      developmentUrl: '',
      productionAssetDirectory,
    });

    expect(result).toMatch(productionAssetDirectory);
  });
});
