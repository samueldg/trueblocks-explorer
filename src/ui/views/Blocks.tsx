import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { useCommand } from '../hooks/useCommand';

const { TabPane } = Tabs;

export const BlocksView = () => {
  const [block] = useCommand('blocks', { blocks: 'latest', hashes: true, cache: true });
  const [details] = useCommand('blocks', { blocks: 'latest', cache: true });
  const getBlock = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <PageHeader title="Blocks" />
      <Tabs>
        <TabPane tab="Summary" key="welcome">
          <pre>{JSON.stringify(getBlock(block), null, 2)}</pre>
        </TabPane>
        <TabPane tab="Full Details" key="scraper">
          <pre>{JSON.stringify(getBlock(details), null, 2)}</pre>
        </TabPane>
      </Tabs>
    </>
  );
};
