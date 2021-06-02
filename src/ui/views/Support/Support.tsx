import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Contact } from './Tabs/Contact';
import { Documentation } from './Tabs/Documentation';
import { HotKeys } from './Tabs/HotKeys';
import { Licensing } from './Tabs/Licensing';
import { About } from './Tabs/About';

const { TabPane } = Tabs;

export const SupportView = () => {
  const title = 'Support';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
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
