import { BaseView } from '@components/BaseView';
import React, { useEffect, useState } from 'react';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation,
  DashboardLocation,
  DashboardMonitorsLocation,
} from '../../Routes';
import useGlobalState from '../../state';
import { cookieVars } from '../../utils';
import { AccountsView } from './Tabs/Accounts/Accounts';
import { Collections } from './Tabs/Collections';
import { Monitors } from './Tabs/Monitors';

export const DashboardView = ({ match }: { match?: any }) => {
  const { accountAddress, names } = useGlobalState();
  const [named, setNamed] = useState('');

  useEffect(() => {
    const name = names && names[accountAddress];
    if (name) setNamed(name.name);
  }, [accountAddress, names]);

  const title = `Dashboard [${accountAddress ? accountAddress : ''} ${accountAddress ? named : ''}]`;
  const tabs = [
    { name: 'Monitors', location: DashboardMonitorsLocation, component: <Monitors />, disabled: false },
    {
      name: 'Account Details',
      location: DashboardAccountsLocation,
      component: <AccountsView />,
      disabled: false,
    },
    { name: 'Collections', location: DashboardCollectionsLocation, component: <Collections />, disabled: false },
  ];

  // console.log('DashboardView');
  return (
    <BaseView
      title={title}
      defaultActive={DashboardMonitorsLocation}
      baseActive={DashboardLocation}
      cookieName={cookieVars.dashboard_current_tab}
      tabs={tabs}
    />
  );
};
