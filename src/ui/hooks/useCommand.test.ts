import {renderHook, RenderResult} from '@testing-library/react-hooks';
import fetchMock, {enableFetchMocks} from 'jest-fetch-mock';
import {Result, useCommand} from './useCommand';

enableFetchMocks();

const extractLoadingFlag = (hookResult: RenderResult<readonly [Result, boolean]>) => hookResult.current[1];

describe('useCommand hook', () => {
  it('returns FailedResult if there is an error', async () => {
    expect.assertions(2);

    const error = new Error('Rejected in test');

    fetchMock.mockImplementationOnce(() => Promise.reject(error));

    const {result: hookResult, waitForNextUpdate} = renderHook(() => useCommand('status'));

    await waitForNextUpdate();

    const [result] = hookResult.current;

    expect(result.status).toBe('fail');
    expect(result.data).toEqual(error.toString());
  });

  it('returns SuccessfulResult if there was no error', async () => {
    expect.assertions(2);

    const response = {running: true};

    fetchMock.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({data: response}),
      } as Response)
    );

    const {result: hookResult, waitForNextUpdate} = renderHook(() => useCommand('status'));

    await waitForNextUpdate();

    const [result] = hookResult.current;

    expect(result.status).toBe('success');
    expect(result.data).toEqual(response);
  });

  it('sets correct loading flag', async () => {
    expect.assertions(2);

    const error = new Error('Rejected in test');

    fetchMock.mockImplementationOnce(() => Promise.reject(error));

    const {result: hookResult, waitForNextUpdate} = renderHook(() => useCommand('status'));

    expect(extractLoadingFlag(hookResult)).toBe(true);

    await waitForNextUpdate();

    expect(extractLoadingFlag(hookResult)).toBe(false);
  });
});
