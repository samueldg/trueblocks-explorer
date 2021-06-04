import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { cookieVars } from '../../utils';
import { Collections } from './Tabs/Collections';
import { Overview } from './Tabs/Overview';
import { Status } from './Tabs/Status';

const { TabPane } = Tabs;

export const DashboardView = () => {
  const [currentTab, setCurrentTab] = useState(Cookies.get(cookieVars.dashboard_current_tab) || 'overview');

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.dashboard_current_tab, key);
    setCurrentTab(key);
  };

  const title = 'Dashboard';
  return (
    <>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
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
