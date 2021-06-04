import { PageHeader, Tabs } from 'antd';
import React, { useState } from 'react';

import Cookies from 'js-cookie';
import { Monitors } from './Tabs/Monitors';
import { NamedAddrs } from './Tabs/NamedAddrs';
import { Tags } from './Tabs/Tag';
import { Signatures } from './Tabs/Signature';
import { When } from './Tabs/When';
import { cookieVars } from '../../utils';

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
