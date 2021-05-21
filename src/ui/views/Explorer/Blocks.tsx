import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const BlocksView = () => {
  const [data] = useCommand('blocks', { blocks: 'latest', hashes: true, cache: true });
  const [detail] = useCommand('blocks', { blocks: 'latest', cache: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  const theDetail = getData(detail);
  const title = `Exploring transaction [${theItem}]`;

  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Summary" key="summary">
          <pre>{JSON.stringify(theItem, null, 2)}</pre>
        </TabPane>
        <TabPane tab="Details" key="details">
          <pre>{JSON.stringify(theDetail, null, 2)}</pre>
        </TabPane>
      </Tabs>
    </>
  );
};
