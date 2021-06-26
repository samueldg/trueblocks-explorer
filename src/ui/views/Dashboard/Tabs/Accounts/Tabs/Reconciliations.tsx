import { addColumn, addNumColumn, BaseTableRows } from '@components/Table';
import { Transaction } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

export const AccountReconciliations = ({ data, columns, loading }: { data: any; columns?: any; loading: boolean }) => {
  return <BaseTableRows data={data} columns={columns ? columns : neighborSchema} loading={loading} />;
};

export const neighborSchema: ColumnsType<Transaction> = [
  addNumColumn({
    title: 'Block Number',
    dataIndex: 'blockNumber',
    configuration: {
      width: 100,
    },
  }),
  addNumColumn({
    title: 'Transaction ID',
    dataIndex: 'transactionIndex',
    configuration: {
      width: 100,
    },
  }),
  addColumn({
    title: 'From',
    dataIndex: 'from',
    configuration: {
      width: 150,
    },
  }),
  addColumn({
    title: 'To',
    dataIndex: 'to',
    configuration: {
      width: 150,
    },
  }),
  addNumColumn({
    title: 'Ether',
    dataIndex: 'ether',
    configuration: {
      width: 100,
    },
  }),
  addColumn({
    title: 'Function',
    dataIndex: 'compressedTx',
  }),
];
