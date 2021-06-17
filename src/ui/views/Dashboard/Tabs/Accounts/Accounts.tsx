import { BaseView } from '@components/BaseView';
import { addColumn, addNumColumn } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { MonitorType } from '@modules/data/monitor';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';
import {
  AccountEventsLocation,
  AccountFunctionsLocation,
  AccountTransactionsLocation,
  DashboardAccountsLocation
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { AccountEvents } from './Tabs/Events';
import { AccountFunctions } from './Tabs/Functions';
import { AccountTransactions } from './Tabs/Transactions';

export const AccountsView = () => {
  const [transactions, loading] = useCommand('export', {
    addrs: '0xf503017d7baf7fbc0fff7492b751025c6a78179b',
    fmt: 'json',
    articulate: true,
    accounting: true,
    max_records: 25,
    ether: true,
  });
  if (transactions.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transactions',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  const title = '';
  var tabs = [
    {
      name: 'Transactions',
      location: AccountTransactionsLocation,
      component: <AccountTransactions data={getData(transactions)} columns={transactionSchema} loading={loading}/>
    },
    {
      name: 'Functions',
      location: AccountFunctionsLocation,
      component: <AccountFunctions data={getData(transactions)} columns={functionSchema} loading={loading}/>
    },
    {
      name: 'Events',
      location: AccountEventsLocation,
      component: <AccountEvents data={getData(transactions)} columns={functionSchema} loading={loading}/>
    },
  ];

  return (
    <BaseView
      title={title}
      defaultActive={AccountTransactionsLocation}
      baseActive={DashboardAccountsLocation}
      cookieName={cookieVars.dashboard_account_sub_tab}
      tabs={tabs}
      subBase
      position='left'
    />
  );
};

const functionSchema: ColumnsType<MonitorType> = [
  addNumColumn({
    title: 'Block Number',
    dataIndex: 'blockNumber',
    configuration: {
      width: 100
    }
  }),
  addNumColumn({
    title: 'Transaction ID',
    dataIndex: 'transactionIndex',
    configuration: {
      width: 100
    }
  }),
  addColumn({
    title: 'Date',
    dataIndex: 'date',
    configuration: {
      width: 250
    }
  }),
  addColumn({
    title: 'From',
    dataIndex: 'from',
    configuration: {
      width: 150
    }
  }),
  addColumn({
    title: 'To',
    dataIndex: 'to',
    configuration: {
      width: 150
    }
  }),
  addNumColumn({
    title: 'Ether',
    dataIndex: 'ether',
    configuration: {
      width: 100
    }
  }),
  addColumn({
    title: 'Function',
    dataIndex: 'compressedTx',
  }),
];

const transactionSchema: ColumnsType<MonitorType> = [
  addColumn({
    title: 'Hash',
    dataIndex: 'hash',
  }),
  addColumn({
    title: 'Block Hash',
    dataIndex: 'blockHash',
  }),
  addColumn({
    title: 'Block Number',
    dataIndex: 'blockNumber',
  }),
  addColumn({
    title: 'Transaction Index',
    dataIndex: 'transactionIndex',
  }),
  addColumn({
    title: 'Timestamp',
    dataIndex: 'timestamp',
  }),
  addColumn({
    title: 'From',
    dataIndex: 'from',
  }),
  addColumn({
    title: 'To',
    dataIndex: 'to',
  }),
  addColumn({
    title: 'Value',
    dataIndex: 'value',
  }),
  addColumn({
    title: 'Gas',
    dataIndex: 'gas',
  }),
  addColumn({
    title: 'Gas Price',
    dataIndex: 'gasPrice',
  }),
  addColumn({
    title: 'Input',
    dataIndex: 'input',
  }),
  addColumn({
    title: 'isError',
    dataIndex: 'isError',
  }),
  addColumn({
    title: 'Has Token',
    dataIndex: 'hasToken',
  }),
  // addColumn({
  //   title: 'Receipt',
  //   dataIndex: 'receipt',
  // }),
  // addColumn({
  //   title: 'Traces',
  //   dataIndex: 'traces',
  // }),
  // addColumn({
  //   title: 'Articulated Tx',
  //   dataIndex: 'articulatedTx',
  // }),
  addColumn({
    title: 'Compressed Tx',
    dataIndex: 'compressedTx',
  }),
  // addColumn({
  //   title: 'Statements',
  //   dataIndex: 'statements',
  // }),
  addColumn({
    title: 'Gas Cost',
    dataIndex: 'gasCost',
  }),
  addColumn({
    title: 'Ether Gas Cost',
    dataIndex: 'etherGasCost',
  }),
  addColumn({
    title: 'Function',
    dataIndex: 'function',
  }),
  addColumn({
    title: 'Gas Used',
    dataIndex: 'gasUsed',
  }),
  addColumn({
    title: 'Date',
    dataIndex: 'date',
  }),
  addColumn({
    title: 'Ether',
    dataIndex: 'ether',
  }),
  addColumn({
    title: 'Encoding',
    dataIndex: 'encoding',
  }),
];
