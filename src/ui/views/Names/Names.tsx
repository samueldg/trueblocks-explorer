import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  NamesAddressesLocation,
  NamesBlocksLocation,
  NamesLocation,
  NamesSignaturesLocation,
  NamesTagsLocation,
} from '../../locations';
import { cookieVars } from '../../utils';
import { NamedAddrs } from './Tabs/NamedAddrs';
import { Signatures } from './Tabs/Signature';
import { Tags } from './Tabs/Tag';
import { When } from './Tabs/When';

const { TabPane } = Tabs;

export const NamesView = () => {
  const history = useHistory();
  const title = 'Names';
  const location = useLocation();
  let subPath = location.pathname.replace(NamesLocation, '');
  const [currentTab, setCurrentTab] = useState(
    (subPath && subPath.length > 0 ? location.pathname : null) ||
      Cookies.get(cookieVars.names_current_tab) ||
      NamesAddressesLocation
  );

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.names_current_tab, key);
    history.push(key);
    setCurrentTab(key);
  };

  return (
    <>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
        <TabPane tab='Addresses' key={NamesAddressesLocation}>
          <NamedAddrs />
        </TabPane>
        <TabPane tab='Tags' key={NamesTagsLocation}>
          <Tags />
        </TabPane>
        <TabPane tab='Signatures' key={NamesSignaturesLocation}>
          <Signatures />
        </TabPane>
        <TabPane tab='Blocks' key={NamesBlocksLocation}>
          <When />
        </TabPane>
      </Tabs>
    </>
  );
};
