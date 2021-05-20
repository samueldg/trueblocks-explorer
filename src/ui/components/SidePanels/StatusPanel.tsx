import React from 'react';

import { useCommand } from '@hooks/useCommand';
import { Loading } from '@components/Loading';

export const StatusPanel = () => {
  const [status, loading] = useCommand('status');

  return (
    <Loading loading={loading}>
      <span>{JSON.stringify(status, null, 2)}</span>
    </Loading>
  );
};
