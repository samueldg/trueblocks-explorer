import React from 'react';

import { useCommand } from '@hooks/useCommand';
import { Loading } from '@components/Loading';

export const HelpPanel = () => {
  const [help, loading] = useCommand('help');
  return (
    <Loading loading={loading}>
      <span>{JSON.stringify(help, null, 2)}</span>
    </Loading>
  );
};
