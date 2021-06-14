import { Loading } from '@components/Loading';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';

export const Monitors = () => {
  const [monitors, loading] = useCommand('status', { mode: 'monitors', details: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response), []);

  return (
    <Loading loading={loading}>
      <pre>{JSON.stringify(getData(monitors), null, 2)}</pre>
    </Loading>
  );
};
