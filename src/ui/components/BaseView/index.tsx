import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { ReactNode, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

export type ViewTab = {
  name: string,
  location: string,
  component: ReactNode,
  disabled?: boolean,
};

interface ViewParams {
  title: string,
  defaultActive: string,
  cookieName: string,
  tabs: ViewTab[];
}

export const BaseView = ({title, cookieName, defaultActive, tabs}: ViewParams) => {
  const history = useHistory();
  const location = useLocation();
  const parts = location.pathname.split('/');
  const subPath = location.pathname.replace(parts[parts.length-1], '');
  const [currentTab, setCurrentTab] = useState(
    (subPath && subPath.length > 0 ? location.pathname : null) ||
      Cookies.get(cookieName) ||
      defaultActive
  );

  const onTabChange = (key: string) => {
    Cookies.set(cookieName, key);
    history.push(key);
    setCurrentTab(key);
  };

  return (
    <>
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
}
