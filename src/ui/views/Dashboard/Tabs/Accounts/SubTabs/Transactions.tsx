import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  DashboardAccountFunctionsLocation,
  DashboardAccountGasLocation,
  DashboardAccountRawLocation,
  DashboardAccountReconsLocation,
  DashboardAccountsLocation,
  DashboardAccountTracesLocation,
} from '../../../../../Routes';
import { AccountFunctions } from './Functions';
import { AccountGas } from './Gas';
import { AccountRecons } from './Recons';

export const AccountTransactions = ({ record }: any) => {
  const title = '';
  const tabs = [
    {
      name: 'Reconciliations',
      location: DashboardAccountReconsLocation,
      component: <AccountRecons record={record} />,
    },
    {
      name: 'Functions / Events',
      location: DashboardAccountFunctionsLocation,
      component: <AccountFunctions record={record} />,
    },
    {
      name: 'Gas Accounting',
      location: DashboardAccountGasLocation,
      component: <AccountGas record={record} />,
    },
    { name: 'Raw', location: DashboardAccountRawLocation, component: <pre>{JSON.stringify(record, null, 2)}</pre> },
    {
      name: 'Traces',
      location: DashboardAccountTracesLocation,
      component: <pre>{JSON.stringify(record.traces, null, 2)}</pre>,
    },
  ];
  return (
    <BaseView
      title={title}
      defaultActive={DashboardAccountFunctionsLocation}
      baseActive={DashboardAccountsLocation}
      cookieName={'shit'} //cookieVars.explorer_current_tab}
      tabs={tabs}
    />
  );
};
