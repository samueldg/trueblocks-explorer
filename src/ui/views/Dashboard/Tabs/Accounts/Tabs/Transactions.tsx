import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  AccountFunctionsLocation,
  AccountNeighborsLocation,
  AccountReconciliationsLocation,
  DashboardAccountsLocation,
} from '../../../../../locations';
import { AccountFunctions } from './Functions';

export const AccountTransactions = ({ record }: any) => {
  const title = '';
  const tabs = [
    {
      name: 'Reconciliations',
      location: AccountReconciliationsLocation,
      component: <div>{JSON.stringify(record)}</div>,
    },
    { name: 'Functions / Events', location: AccountFunctionsLocation, component: <AccountFunctions record={record} /> },
    { name: 'Gas', location: AccountNeighborsLocation, component: <div>{JSON.stringify(record)}</div> },
    { name: 'Neighbors', location: AccountNeighborsLocation, component: <div>{JSON.stringify(record)}</div> },
    { name: 'Traces', location: AccountNeighborsLocation, component: <div>{JSON.stringify(record)}</div> },
  ];
  return (
    <BaseView
      title={title}
      defaultActive={AccountFunctionsLocation}
      baseActive={DashboardAccountsLocation}
      cookieName={'shit'} //cookieVars.explorer_current_tab}
      tabs={tabs}
    />
  );
};
