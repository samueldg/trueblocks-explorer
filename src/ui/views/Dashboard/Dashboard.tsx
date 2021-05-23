import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Overview } from './Tabs/Overview';
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
        <TabPane tab="Status" key="status">
          <Status />
        </TabPane>
      </Tabs>
    </>
  );
};
