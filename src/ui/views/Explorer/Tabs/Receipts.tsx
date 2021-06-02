import React, { useCallback } from 'react';
import { createErrorNotification } from '@modules/error_notification';
import { Loading } from '@components/Loading';
import { useCommand } from '@hooks/useCommand';

export const Receipts = () => {
  const [data, loading] = useCommand('receipts', { transactions: 'latest', articulate: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  if (data.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch block',
    });
  }

  return (
    <Loading loading={loading}>
      <pre>{JSON.stringify(theItem, null, 2)}</pre>
    </Loading>
  );
};
