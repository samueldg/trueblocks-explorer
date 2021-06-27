import { addColumn, addNumColumn } from '@components/Table';
import { Transaction } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

export const AccountReconciliations = ({ record }: { record: Transaction }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 28fr 3fr' }}>
      <div></div>
      <div style={{ border: '1px solid black' }}>{JSON.stringify(record, null, 2)}</div>
      <div></div>
    </div>
  );
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
