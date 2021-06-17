import { addColumn, addFlagColumn, addNumColumn } from '@components/Table';
import { ColumnsType } from 'antd/lib/table';

export type TransactionType = {
  /* eslint-disable camelcase */
  blockNumber: number /* blknum */;
  difficulty: number /* uint64 */;
  finalized: boolean /* bool */;
  gasLimit: string /* gas */;
  gasUsed: string /* gas */;
  hash: string /* hash */;
  light: boolean /* bool */;
  miner: string /* address */;
  name: string /* string */;
  parentHash: string /* hash */;
  price: number /* double */;
  timestamp: number /* timestamp */;
  // transactions: array /* CTransactionArray */
  // tx_hashes: array /* CStringArray */
};

export const functionSchema: ColumnsType<TransactionType> = [
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

export const transactionSchema: ColumnsType<TransactionType> = [
  // addColumn({
  //   title: 'Hash',
  //   dataIndex: 'hash',
  // }),
  // addColumn({
  //   title: 'Block Hash',
  //   dataIndex: 'blockHash',
  // }),
  addNumColumn({
    title: 'Block Number',
    dataIndex: 'blockNumber',
    configuration: {
      width: 100
    }
  }),
  addNumColumn({
    title: 'Transaction Index',
    dataIndex: 'transactionIndex',
    configuration: {
      width: 100
    }
  }),
  // addColumn({
  //   title: 'Timestamp',
  //   dataIndex: 'timestamp',
  // }),
  addColumn({
    title: 'Date',
    dataIndex: 'date',
  }),
  addColumn({
    title: 'From',
    dataIndex: 'from',
  }),
  addColumn({
    title: 'To',
    dataIndex: 'to',
  }),
  // addColumn({
  //   title: 'Value',
  //   dataIndex: 'value',
  // }),
  // addColumn({
  //   title: 'Gas',
  //   dataIndex: 'gas',
  // }),
  // addColumn({
  //   title: 'Gas Price',
  //   dataIndex: 'gasPrice',
  // }),
  // addColumn({
  //   title: 'Input',
  //   dataIndex: 'input',
  // }),
  addFlagColumn({
    title: 'Err',
    dataIndex: 'isError',
    configuration: {
      width: 50
    }
  }),
  addFlagColumn({
    title: 'Tok',
    dataIndex: 'hasToken',
    configuration: {
      width: 50
    }
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
  //   configuration: {
  //     width: 400,
  //     render: (obj: any) => <pre>{JSON.stringify(obj, null, 2)}</pre>
  //   }
  // }),
  addColumn({
    title: 'Function Call',
    dataIndex: 'compressedTx',
    configuration: {
      width: 500
    }
  }),
  // addColumn({
  //   title: 'Statements',
  //   dataIndex: 'statements',
  // }),
  // addColumn({
  //   title: 'Gas Cost',
  //   dataIndex: 'gasCost',
  // }),
  addColumn({
    title: 'Ether',
    dataIndex: 'ether',
  }),
  addColumn({
    title: 'Gas Cost',
    dataIndex: 'etherGasCost',
  }),
  // addColumn({
  //   title: 'Function',
  //   dataIndex: 'function',
  // }),
  // addColumn({
  //   title: 'Gas Used',
  //   dataIndex: 'gasUsed',
  // }),
  // addColumn({
  //   title: 'Encoding',
  //   dataIndex: 'encoding',
  // }),
];
