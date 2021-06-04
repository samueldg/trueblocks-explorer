import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { cookieVars } from '../../utils';
import { Blocks } from './Tabs/Blocks';
import { Indexes } from './Tabs/Indexes';
import { Logs } from './Tabs/Logs';
import { Receipts } from './Tabs/Receipts';
import { Traces } from './Tabs/Traces';
import { Transactions } from './Tabs/Transactions';

const { TabPane } = Tabs;

export const ExplorerView = () => {
  const [currentTab, setCurrentTab] = useState(Cookies.get(cookieVars.explorer_current_tab) || 'indexes');

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.explorer_current_tab, key);
    setCurrentTab(key);
  };

  const title = 'Explorer';
  return (
    <>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
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
