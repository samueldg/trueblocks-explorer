import React from 'react';

import { useCommand } from '@hooks/useCommand';
import { Loading } from '@components/Loading';

export const StatusPanel = () => {
  const [status, loading] = useCommand('status');

  return (
    <Loading loading={loading}>
      <span>
        {status.content.toString()}
      </span>
    </Loading>
  );
};
