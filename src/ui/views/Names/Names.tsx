import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Monitors } from './Tabs/Monitors';
import { NamedAddrs } from './Tabs/NamedAddrs';
import { Tags } from './Tabs/Tag';
import { Signatures } from './Tabs/Signature';
import { When } from './Tabs/When';

const { TabPane } = Tabs;

export const MonitorsView = () => {
  const title = 'Monitors';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="All Monitors" key="monitors">
          <Monitors />
        </TabPane>
        <TabPane tab="All Names" key="addrs">
          <NamedAddrs />
        </TabPane>
        <TabPane tab="Tags" key="tags">
          <Tags />
        </TabPane>
        <TabPane tab="Signatures" key="signatures">
          <Signatures />
        </TabPane>
        <TabPane tab="Named Blocks" key="blocks">
          <When />
        </TabPane>
      </Tabs>
    </>
  );
};
