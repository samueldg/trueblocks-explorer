import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Contact } from './Contact';
import { Documentation } from './Documentation';
import { HotKeys } from './HotKeys';
import { Licensing } from './Licensing';
import { About } from './About';

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
