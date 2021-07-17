import {
  NamesAddressesLocation,
  NamesBlocksLocation,
  NamesEventSigsLocation,
  NamesFuncSigsLocation,
  NamesLocation,
  NamesTagsLocation,
} from '../../Routes';

import { Addresses } from './Tabs/Addresses';
import { BaseView } from '@components/BaseView';
import { EventSignatures } from './Tabs/EventSignatures';
import { FunctionSignatures } from './Tabs/FunctionSignatures';
import React from 'react';
import { Tags } from './Tabs/Tag';
import { When } from './Tabs/When';
import { cookieVars } from '../../Utils';

export const NamesView = () => {
  const title = 'Names';
  const tabs = [
    { name: 'Named Addresses', location: NamesAddressesLocation, component: <Addresses /> },
    { name: 'Address Tags', location: NamesTagsLocation, component: <Tags /> },
    { name: 'Function Signatures', location: NamesFuncSigsLocation, component: <FunctionSignatures /> },
    { name: 'Event Signatures', location: NamesEventSigsLocation, component: <EventSignatures /> },
    { name: 'Named Blocks', location: NamesBlocksLocation, component: <When /> },
  ];

  return (
    <BaseView
      title={title}
      defaultActive={NamesAddressesLocation}
      baseActive={NamesLocation}
      cookieName={cookieVars.names_current_tab}
      tabs={tabs}
    />
  );
};
