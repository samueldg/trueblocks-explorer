import React from 'react';
import {
  either as Either,
} from 'fp-ts';
import {
  pipe,
} from 'fp-ts/function';
import { JsonResponse } from '../../modules/core';

type StatusPanelProps = {
  status: Either.Either<Error, JsonResponse>,
};

export const StatusPanel = ({ status }: StatusPanelProps) => {
  const result = pipe(
    status,
    Either.map((fetchedStatus) => fetchedStatus.data || 'Loading'),
    Either.fold(
      (error) => error.toString(),
      (mappedStatus) => mappedStatus[0].trueblocks_version || mappedStatus,
    ),
  );

  return (
    <span>
      {result}
    </span>
  );
};
