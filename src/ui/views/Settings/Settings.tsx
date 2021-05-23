import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { Status } from './Tabs/Status';
import { Caches } from './Tabs/Caches';
import { Skins } from './Tabs/Skins';
import { Schemas } from './Tabs/Schemas';

const { TabPane } = Tabs;

export const SystemView = () => {
  const title = 'Settings';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Status" key="status">
          <Status />
        </TabPane>
        <TabPane tab="Caches" key="caches">
          <Caches />
        </TabPane>
        <TabPane tab="Skins" key="skins">
          <Skins />
        </TabPane>
        <TabPane tab="Schemas" key="schemas">
          <Schemas />
        </TabPane>
      </Tabs>
    </>
  );
};
