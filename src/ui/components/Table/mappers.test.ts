import renderer from 'react-test-renderer';

import * as Mappers from './mappers';

describe('Table/mappers module', () => {
  test('renderFlag returns correct components', () => {
    const { renderFlag } = Mappers;

    const treeWhenNoFlag = renderer
      .create(
        renderFlag(undefined),
      ).toJSON();

    const treeWhenFlagTrue = renderer
      .create(
        renderFlag(true),
      ).toJSON();

    const treeWhenFlagFalse = renderer
      .create(
        renderFlag(false),
      ).toJSON();

    expect(treeWhenNoFlag).toMatchSnapshot();
    expect(treeWhenFlagTrue).toMatchSnapshot();
    expect(treeWhenFlagFalse).toMatchSnapshot();
  });

  test('renderTagsWithClickHandler returns correct components', () => {
    const renderTags = Mappers.renderTagsWithClickHandler(() => { });
    const tags = '31-Gitcoin Grants:Friends';

    const treeWhenNoTags = renderer
      .create(
        renderTags(undefined),
      ).toJSON();

    const treeWhenTags = renderer
      .create(
        renderTags(tags),
      ).toJSON();

    expect(treeWhenNoTags).toMatchSnapshot();
    expect(treeWhenTags).toMatchSnapshot();
  });

  test('renderActionsAsColumn uses getActions function', () => {
    const getActions = jest.fn();
    const expectedColumnWidth = 100;
    const record = { a: 1 };

    const getColumn = Mappers.renderActionsAsColumn(expectedColumnWidth);
    const result = getColumn(getActions);
    result.render('text', record);

    expect(result.width).toBe(expectedColumnWidth);
    expect(getActions).toHaveBeenCalledWith(record);
  });
});
