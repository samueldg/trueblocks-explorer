import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const TracesView = () => {
  const [data] = useCommand('traces', { transactions: 'latest', articulate: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  const title = `Exploring traces [${theItem}]`;

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
