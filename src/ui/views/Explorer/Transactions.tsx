import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { createErrorNotification } from '@modules/error_notification';
import { Loading } from '@components/Loading';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const TransactionsView = () => {
  const [data, loading] = useCommand('transactions', { transactions: '12001001.1', cache: true, articulate: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  if (data.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transaction',
    });
  }

  const title = `Exploring transaction [${theItem}]`;
  return (
    <Loading loading={loading}>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Summary" key="welcome">
          <pre>{JSON.stringify(theItem, null, 2)}</pre>
        </TabPane>
      </Tabs>
    </Loading>
  );
};
