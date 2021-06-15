import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  NamesAddressesLocation,
  NamesBlocksLocation,

  NamesSignaturesLocation,
  NamesTagsLocation
} from '../../locations';
import { cookieVars } from '../../utils';
import { NamedAddrs } from './Tabs/NamedAddrs';
import { Signatures } from './Tabs/Signature';
import { Tags } from './Tabs/Tag';
import { When } from './Tabs/When';

export const NamesView = () => {
  const title = 'Names';
  const tabs = [
    {name: "Addresses", location: NamesAddressesLocation, component: <NamedAddrs />},
    {name: "Tags", location: NamesTagsLocation, component: <Tags />},
    {name: "Signatures", location: NamesSignaturesLocation, component: <Signatures />},
    {name: "Blocks", location: NamesBlocksLocation, component: <When />},
  ];
  return (
    <BaseView
      title={title}
      defaultActive={NamesAddressesLocation}
      cookieName={cookieVars.names_current_tab}
      tabs={tabs}
    />
  );
};
