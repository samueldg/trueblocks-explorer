import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { cookieVars } from '../../utils';
import { About } from './Tabs/About';
import { Contact } from './Tabs/Contact';
import { Documentation } from './Tabs/Documentation';
import { HotKeys } from './Tabs/HotKeys';
import { Licensing } from './Tabs/Licensing';

const { TabPane } = Tabs;

export const SupportView = () => {
  const [currentTab, setCurrentTab] = useState(Cookies.get(cookieVars.support_current_tab) || 'contact');

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.support_current_tab, key);
    setCurrentTab(key);
  };

  const title = 'Support';
  return (
    <>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
        <TabPane tab="Contact Us" key="contact">
          <Contact />
        </TabPane>
        <TabPane tab="Documentation" key="documentation">
          <Documentation />
        </TabPane>
        <TabPane tab="Hot Keys" key="hotkeys">
          <HotKeys />
        </TabPane>
        <TabPane tab="Licensing" key="licensing">
          <Licensing />
        </TabPane>
        <TabPane tab="About Us" key="about">
          <About />
        </TabPane>
      </Tabs>
    </>
  );
};
