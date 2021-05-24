import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Overview } from './Tabs/Overview';
import { Collections } from './Tabs/Collections';
import { Status } from './Tabs/Status';

const { TabPane } = Tabs;

export const DashboardView = () => {
  const title = 'Dashboard';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Overview" key="overview">
          <Overview />
        </TabPane>
        <TabPane tab="Collections" key="collections">
          <Collections />
        </TabPane>
        <TabPane tab="System Status" key="status">
          <Status />
        </TabPane>
      </Tabs>
    </>
  );
};
