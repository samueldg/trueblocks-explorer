import { addColumn, BaseTableRows } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { MonitorType } from '@modules/data/monitor';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const AccountTransactions = () => {
  const [transactions, loading] = useCommand('export', {
    addrs: '0xf503017d7baf7fbc0fff7492b751025c6a78179b',
    fmt: 'json',
    articulate: true,
    accounting: true,
    max_records: 20,
    ether: true,
  });
  if (transactions.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transactions',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return (
    <>
      {/*<pre>{JSON.stringify(getData(transactions), null, 2)}</pre>*/}
      <pre>count: {getData(transactions)?.length}</pre>
      <BaseTableRows data={getData(transactions)} columns={transactionSchema} loading={loading} />
    </>
  );
};

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
