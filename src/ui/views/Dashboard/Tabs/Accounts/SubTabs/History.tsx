import { BaseView } from '@components/BaseView';
import { BaseTable, SelectedRow } from '@components/Table';
import { TransactionArray } from '@modules/types';
import React from 'react';
import {
  DashboardAccountsLocation,
  DashboardAccountsHistoryFunctionsLocation,
  DashboardAccountsHistoryEventsLocation,
  DashboardAccountsHistoryCustomLocation,
  DashboardAccountsHistoryReconsLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountsHistoryTracesLocation,
} from '../../../../../Routes';
import { transactionSchema } from '../Accounts';
import { AccountHistoryEvents } from './HistoryEvents';
import { AccountHistoryFunctions } from './HistoryFunctions';
import { AccountHistoryRecons } from './HistoryRecons';
import { cookieVars } from '../../../../../utils';

export const AccountHistory = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  const siderRender = (record: any, selectedRow: SelectedRow) => (
    <AccountHistorySider key='account-transactions' record={record} selectedRow={selectedRow} />
  );

  return (
    <BaseTable
      dataSource={theData}
      columns={transactionSchema}
      loading={loading}
      extraData={accountAddress}
      siderRender={siderRender}
    />
  );
};

export const AccountHistorySider = ({ record, selectedRow }: { record: any; selectedRow: SelectedRow }) => {
  const tabs = [
    {
      name: 'Recons',
      location: DashboardAccountsHistoryReconsLocation,
      component: <AccountHistoryRecons record={record} />,
    },
    {
      name: 'Function',
      location: DashboardAccountsHistoryFunctionsLocation,
      component: <AccountHistoryFunctions record={record} />,
    },
    {
      name: 'Events',
      location: DashboardAccountsHistoryEventsLocation,
      component: <AccountHistoryEvents record={record} />,
    },
    {
      name: 'Traces',
      location: DashboardAccountsHistoryTracesLocation,
      component: <pre>{JSON.stringify(record?.traces, null, 2)}</pre>,
    },
    {
      name: 'Custom',
      location: DashboardAccountsHistoryCustomLocation,
      component: <pre>{JSON.stringify(record?.to, null, 2)}</pre>,
    },
  ];

  return (
    <BaseView
      title={''}
      defaultActive={DashboardAccountsHistoryLocation}
      baseActive={DashboardAccountsLocation}
      cookieName={cookieVars.dashboard_account_history_sub_tab}
      tabs={tabs}
      subBase={true}
    />
  );
};
