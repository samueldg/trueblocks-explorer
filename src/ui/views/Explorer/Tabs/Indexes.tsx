import React, { useCallback } from 'react';
import { createErrorNotification } from '@modules/error_notification';
import { Loading } from '@components/Loading';
import { useCommand } from '@hooks/useCommand';

export const Indexes = () => {
  const [data, loading] = useCommand('status', { mode: 'index', details: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  if (data.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch indexes',
    });
  }

  return (
    <Loading loading={loading}>
      <pre>{JSON.stringify(theItem, null, 2)}</pre>
    </Loading>
  );
};
