// Use momemnt to format dates

import { addColumn, addNumColumn } from '@components/Table';
import { ColumnsType } from 'antd/lib/table';

export type TransactionType = {
  /* eslint-disable camelcase */
  hash: string /* hash */;
  blockHash: string /* hash */;
  blockNumber: number /* blknum */;
  transactionIndex: number /* blknum */;
  date: string /* date */;
  nonce: number /* uint64 */;
  timestamp: number /* timestamp */;
  from: string /* address */;
  to: string /* address */;
  value: string /* wei */;
  extraValue1: string /* wei */;
  extraValue2: string /* wei */;
  gas: string /* gas */;
  gasPrice: string /* gas */;
  input: string /* string */;
  isError: number /* uint8 */;
  hasToken: number /* uint8 */;
  cachebits: number /* uint8 */;
  reserved2: number /* uint8 */;
  receipt: any /* CReceipt */;
  traces: any[] /* CTraceArray */;
  articulatedTx: any /* CFunction */;
  compressedTx: string /* string */;
  statements: any /* CReconciliationArray */;
  finalized: boolean /* bool */;
};

export const functionSchema: ColumnsType<TransactionType> = [
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
