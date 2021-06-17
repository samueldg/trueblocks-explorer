import { Loading } from '@components/Loading';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import React, { useCallback } from 'react';

export const AccountFunctions = () => {
  const [functions, loading] = useCommand('export', { addrs: '0xf503017d7baf7fbc0fff7492b751025c6a78179b', fmt: 'json' });
  if (functions.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch indexes',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  const theItem = getData(functions);
  return (
    <Loading loading={loading}>
      <pre>{JSON.stringify(theItem, null, 2)}</pre>
    </Loading>
  );
};
