import {
  SupportAboutUsLocation,
  SupportContactUsLocation,
  SupportDocumentationLocation,
  SupportHotKeysLocation,
  SupportLicensingLocation,
  SupportLocation,
} from '../../Routes';

import { About } from './Tabs/About';
import { BaseView } from '@components/BaseView';
import { Contact } from './Tabs/Contact';
import { Documentation } from './Tabs/Documentation';
import { HotKeys } from './Tabs/HotKeys';
import { Licensing } from './Tabs/Licensing';
import React from 'react';
import { cookieVars } from '../../Utils';

export const SupportView = () => {
  const title = 'Support';
  const tabs = [
    { name: 'Contact Us', location: SupportContactUsLocation, component: <Contact /> },
    { name: 'Documentation', location: SupportDocumentationLocation, component: <Documentation /> },
    { name: 'Hot Keys', location: SupportHotKeysLocation, component: <HotKeys /> },
    { name: 'Licensing', location: SupportLicensingLocation, component: <Licensing /> },
    { name: 'About Us', location: SupportAboutUsLocation, component: <About /> },
  ];

  return (
    <BaseView
      title={title}
      defaultActive={SupportContactUsLocation}
      baseActive={SupportLocation}
      cookieName={cookieVars.support_current_tab}
      tabs={tabs}
    />
  );
};
