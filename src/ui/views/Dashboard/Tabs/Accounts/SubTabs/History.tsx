import { BaseView } from '@components/BaseView';
import { BaseTable, SelectedRow } from '@components/Table';
import { TransactionArray } from '@modules/types';
import React from 'react';
import {
  DashboardAccountFunctionsLocation,
  DashboardAccountReconsLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountTracesLocation,
} from '../../../../../Routes';
import { transactionSchema } from '../Accounts';
import { AccountHistoryFunctions } from './HistoryFunctions';
import { AccountHistoryRecons } from './HistoryRecons';

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
  const title = '';
  const tabs = [
    {
      name: 'Reconciliations',
      location: DashboardAccountReconsLocation,
      component: <AccountHistoryRecons record={record} />,
    },
    {
      name: 'Functions / Events',
      location: DashboardAccountFunctionsLocation,
      component: <AccountHistoryFunctions record={record} />,
    },
    {
      name: 'Traces',
      location: DashboardAccountTracesLocation,
      component: <pre>{JSON.stringify(record?.traces, null, 2)}</pre>,
    },
  ];
  const debug = null;
  // (
  //   <div>
  //     <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
  //     <br />
  //   </div>
  // );
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
