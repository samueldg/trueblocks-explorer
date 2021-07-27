import {
  DashboardAccountsHistoryCustomLocation,
  DashboardAccountsHistoryEventsLocation,
  DashboardAccountsHistoryFunctionsLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountsHistoryReconsLocation,
  DashboardAccountsHistoryTracesLocation,
  DashboardAccountsLocation,
} from '../../../../../Routes';
import useGlobalState from '../../../../../State';
import { cookieVars } from '../../../../../Utilities';
import { transactionSchema } from '../Accounts';
import { HistoryEvents } from './HistoryEvents';
import { HistoryFunctions } from './HistoryFunctions';
import { HistoryRecons } from './HistoryRecons';
import { BaseView } from '@components/BaseView';
import { BaseTable, SelectedRow } from '@components/Table';
import { Transaction, TransactionArray } from '@modules/types';
import React from 'react';

export const History = ({
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
      component: <HistoryRecons record={record} />,
    },
    {
      name: 'Events',
      location: DashboardAccountsHistoryEventsLocation,
      component: <HistoryEvents record={record} />,
    },
    {
      name: 'Function',
      location: DashboardAccountsHistoryFunctionsLocation,
      component: <HistoryFunctions record={record} />,
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
      defaultActive={DashboardAccountsHistoryReconsLocation}
      baseActive={DashboardAccountsHistoryLocation}
      cookieName={cookieVars.dashboard_account_history_sub_tab}
      tabs={tabs}
      subBase={true}
    />
  );
};
