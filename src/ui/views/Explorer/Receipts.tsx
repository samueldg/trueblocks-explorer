import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const ReceiptsView = () => {
  const [data] = useCommand('receipts', { transactions: 'latest', articulate: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  const title = `Exploring receipts [${theItem}]`;

  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Summary" key="welcome">
          <pre>{JSON.stringify(theItem, null, 2)}</pre>
        </TabPane>
      </Tabs>
    </>
  );
};
