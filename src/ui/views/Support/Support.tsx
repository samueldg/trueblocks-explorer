import { PageHeader, Tabs } from 'antd';
import React from 'react';
import {About} from './About';

const { TabPane } = Tabs;

export const SupportView = () => {
  const title = 'Support';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Contact Us" key="contact">
          <pre>Contact Us</pre>
        </TabPane>
        <TabPane tab="Documentation" key="documentation">
          <pre>Documentation</pre>
        </TabPane>
        <TabPane tab="Icons" key="icons">
          <pre>Icons</pre>
        </TabPane>
        <TabPane tab="Hot Keys" key="hotkeys">
          <pre>Hot Keys</pre>
        </TabPane>
        <TabPane tab="Licensing" key="licensing">
          <pre>Licensing</pre>
        </TabPane>
        <TabPane tab="About Us" key="about">
          <About />
        </TabPane>
      </Tabs>
    </>
  );
};
