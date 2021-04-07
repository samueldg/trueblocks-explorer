import {
  either as Either,
} from 'fp-ts';
import { pipe } from 'fp-ts/function';
import {
  useEffect,
  useState,
} from 'react';
import {
  runCommand,
  CommandParams,
  CoreCommand,
  JsonResponse,
} from '../modules/core';

type SuccessfulResult = {
  status: 'success',
  content: JsonResponse,
};

type FailedResult = {
  status: 'fail',
  content: string,
};

export type Result = SuccessfulResult | FailedResult;

function toFailedResult(error: Error): FailedResult {
  return {
    status: 'fail',
    content: error.toString(),
  };
}

function toSuccessfulResult(responseData: JsonResponse): SuccessfulResult {
  return {
    status: 'success',
    content: responseData,
  };
}

export function useCommand(command: CoreCommand, params?: CommandParams) {
  const [response, setResponse] = useState<Result>(toSuccessfulResult({}));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const eitherResponse = await runCommand(command, params);
      const result: Result = pipe(
        eitherResponse,
        Either.fold(
          toFailedResult,
          (serverResponse) => toSuccessfulResult(serverResponse.data) as Result,
        ),
      );
      setResponse(result);
      setLoading(false);
    })();
  }, []);

  return [response, loading] as const;
}
