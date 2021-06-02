import * as Either from 'fp-ts/lib/Either';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

import * as Core from './index';

enableFetchMocks();

describe('runCommand', () => {
  it('returns JSON response', async () => {
    expect.assertions(2);

    const expectedResponse = { test: true };
    fetchMock.mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(expectedResponse),
    } as Response));

    const eitherResponse = await Core.runCommand('abis', { param1: 'value' });

    expect(Either.isRight(eitherResponse)).toBe(true);

    Either.fold(
      () => { throw new Error(); },
      (response) => expect(response).toEqual(expectedResponse),
    )(eitherResponse);
  });

  it('returns error when response status is not 200', async () => {
    expect.assertions(2);

    const statusText = 'Unauthorized';

    fetchMock.mockImplementationOnce(() => Promise.resolve({
      status: 401,
      ok: false,
      statusText,
    } as Response));

    const eitherResponse = await Core.runCommand('abis', { param1: 'value' });

    expect(Either.isLeft(eitherResponse)).toBe(true);

    const fold = Either.fold(
      (error: Error) => error.toString(),
      () => '',
    );

    expect(fold(eitherResponse)).toBe(`Error: ${statusText}`);
  });

  it('returns error on fail', async () => {
    expect.assertions(2);

    const connectionError = new Error('Connection broken');
    fetchMock.mockImplementationOnce(() => Promise.reject(connectionError));

    const eitherResponse = await Core.runCommand('abis', { param1: 'value' });

    expect(Either.isLeft(eitherResponse)).toBe(true);

    const fold = Either.fold(
      (error: Error) => error.toString(),
      () => null,
    );

    expect(fold(eitherResponse)).toBe(connectionError.toString());
  });
});
