import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Indexes } from './Tabs/Indexes';
import { Blocks } from './Tabs/Blocks';
import { Transactions } from './Tabs/Transactions';
import { Receipts } from './Tabs/Receipts';
import { Logs } from './Tabs/Logs';
import { Traces } from './Tabs/Traces';

const { TabPane } = Tabs;

export const ExplorerView = () => {
  const title = 'Explorer';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Indexes" key="indexes">
          <Indexes />
        </TabPane>
        <TabPane tab="Blocks" key="blocks">
          <Blocks />
        </TabPane>
        <TabPane tab="Transactions" key="transactions">
          <Transactions />
        </TabPane>
        <TabPane tab="Receipts" key="receipts">
          <Receipts />
        </TabPane>
        <TabPane tab="Logs" key="logs">
          <Logs />
        </TabPane>
        <TabPane tab="Traces" key="traces">
          <Traces />
        </TabPane>
      </Tabs>
    </>
  );
};
