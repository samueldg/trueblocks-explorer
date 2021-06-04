import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { cookieVars } from '../../utils';
import { Monitors } from './Tabs/Monitors';
import { NamedAddrs } from './Tabs/NamedAddrs';
import { Signatures } from './Tabs/Signature';
import { Tags } from './Tabs/Tag';
import { When } from './Tabs/When';

const { TabPane } = Tabs;

export const NamesView = () => {
  const title = 'Names';
  const [currentTab, setCurrentTab] = useState(Cookies.get(cookieVars.names_current_tab) || 'monitors');

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.names_current_tab, key);
    setCurrentTab(key);
  };

  return (
    <>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
        <TabPane tab="Monitors" key="monitors">
          <Monitors />
        </TabPane>
        <TabPane tab="Addresses" key="addresses">
          <NamedAddrs />
        </TabPane>
        <TabPane tab="Tags" key="tags">
          <Tags />
        </TabPane>
        <TabPane tab="Signatures" key="signatures">
          <Signatures />
        </TabPane>
        <TabPane tab="Blocks" key="blocks">
          <When />
        </TabPane>
      </Tabs>
    </>
  );
};
