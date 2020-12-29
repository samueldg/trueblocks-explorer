import * as StringValidation from './string_validation';

it('has correct address constraints', () => {
  const constraint = StringValidation.addressConstraints;

  expect(constraint.pattern).toBeTruthy();
  expect(constraint.pattern.value).toBeTruthy();
  expect(constraint.pattern.message).toBeTruthy();

  const regExp = constraint.pattern.value;

  expect(regExp.test('thisDoesntStartWith0x')).toBe(false);
  expect(regExp.test('0xTooShort')).toBe(false);
  expect(regExp.test('0x'.padEnd(42, 'Z'))).toBe(false);

  const correctString = '0x'.padEnd(42, 'A');

  expect(regExp.test(correctString)).toBe(true);
});

it('has correct name constraints', () => {
  const constraint = StringValidation.nameConstraints;

  expect(constraint.pattern).toBeTruthy();
  expect(constraint.pattern.value).toBeTruthy();
  expect(constraint.pattern.message).toBeTruthy();

  const regExp = constraint.pattern.value;

  expect(regExp.test('1')).toBe(false);
  expect(regExp.test('Nope (no no no) <3')).toBe(false);
  expect(regExp.test('Abc,,,...')).toBe(false);

  const correctString = 'środki 1';

  expect(regExp.test(correctString)).toBe(true);
});

it('has correct tags constraints', () => {
  const constraint = StringValidation.tagsConstraints;

  expect(constraint.pattern).toBeTruthy();
  expect(constraint.pattern.value).toBeTruthy();
  expect(constraint.pattern.message).toBeTruthy();

  const regExp = constraint.pattern.value;

  expect(regExp.test('tag1 tag2')).toBe(false);
  expect(regExp.test('tag1, ta g2')).toBe(false);

  expect(regExp.test('tag1, tag2')).toBe(true);
  expect(regExp.test('tag1,tag2')).toBe(true);
  expect(regExp.test('tag1, tag2,  tag3')).toBe(true);
});
