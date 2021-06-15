import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardIndexesLocation,
  DashboardLocation,
  DashboardMonitorsLocation,
  DashboardOverviewLocation
} from '../../locations';
import { cookieVars } from '../../utils';
import { Accounts } from './Tabs/Accounts';
import { Collections } from './Tabs/Collections';
import { Indexes } from './Tabs/Indexes';
import { Monitors } from './Tabs/Monitors';
import { Overview } from './Tabs/Overview';

const { TabPane } = Tabs;

export const DashboardView = () => {
  const history = useHistory();
  const location = useLocation();
  let subPath = location.pathname.replace(DashboardLocation, '');
  const [currentTab, setCurrentTab] = useState(
    (subPath && subPath.length > 0 ? location.pathname : null) ||
      Cookies.get(cookieVars.dashboard_current_tab) ||
      DashboardOverviewLocation
  );

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.dashboard_current_tab, key);
    history.push(key);
    setCurrentTab(key);
  };

  const title = 'Dashboard';
  var tabs = [
    {name: "Overview", location: DashboardOverviewLocation, component: <Overview />, disabled: false},
    {name: "Accounts", location: DashboardAccountsLocation, component: <Accounts />, disabled: true},
    {name: "Monitors", location: DashboardMonitorsLocation, component: <Monitors />, disabled: false},
    {name: "Collections", location: DashboardCollectionsLocation, component: <Collections />, disabled: false},
    {name: "Indexes", location: DashboardIndexesLocation, component: <Indexes />, disabled: false},
  ]
  if (location.pathname === DashboardAccountsLocation)
    tabs[1].disabled = false;

  return (
    <>
      <Link to={DashboardAccountsLocation} onChange={(key) => onTabChange(DashboardAccountsLocation)}>Link</Link>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
        {tabs.map((tab) => (
          <TabPane tab={tab.name} key={tab.location} disabled={tab.disabled}>
            {tab.component}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
