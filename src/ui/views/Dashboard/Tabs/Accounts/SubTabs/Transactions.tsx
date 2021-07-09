import { BaseView } from '@components/BaseView';
import { SelectedRow } from '@components/Table';
import React from 'react';
import {
  DashboardAccountFunctionsLocation,
  DashboardAccountReconsLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountTracesLocation,
} from '../../../../../Routes';
import { AccountFunctions } from './Functions';
import { AccountRecons } from './Recons';

export const AccountHistory = ({ record, selectedRow }: { record: any; selectedRow: SelectedRow }) => {
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
      name: 'Traces',
      location: DashboardAccountTracesLocation,
      component: <pre>{JSON.stringify(record?.traces, null, 2)}</pre>,
    },
  ];
  const debug = (
    <div>
      <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
      <br />
    </div>
  );
  return (
    <div>
      {debug}
      <BaseView
        title={title}
        defaultActive={DashboardAccountFunctionsLocation}
        baseActive={DashboardAccountsHistoryLocation}
        cookieName={'shit'} //cookieVars.explorer_current_tab}
        tabs={tabs}
      />
    </div>
  );
};
