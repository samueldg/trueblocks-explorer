import { PageHeader, Tabs } from 'antd';
import React from 'react';

import { NamedAddrs } from './Tabs/NamedAddrs';
import { Tags } from './Tabs/Tag';
import { Signatures } from './Tabs/Signature';
import { When } from './Tabs/When';

const { TabPane } = Tabs;

export const NamesView = () => {
  const title = 'Names';
  return (
    <>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Addresses" key="addrs">
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
