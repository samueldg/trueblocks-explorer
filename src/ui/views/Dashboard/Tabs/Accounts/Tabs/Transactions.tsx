import { addColumn, addFlagColumn, BaseTableRows } from '@components/Table';
import { Transaction } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

export const AccountTransactions = ({
  data,
  columns,
  loading,
  currentAddress,
}: {
  data: any;
  columns?: any;
  loading: boolean;
  currentAddress: string;
}) => {
  return (
    <BaseTableRows
      data={data}
      columns={columns ? columns : transactionSchema}
      loading={loading}
      extraData={currentAddress}
    />
  );
};

export const transactionSchema: ColumnsType<Transaction> = [
  // addColumn({
  //   title: 'Hash',
  //   dataIndex: 'hash',
  // }),
  // addColumn({
  //   title: 'Block Hash',
  //   dataIndex: 'blockHash',
  // }),
  // addColumn({
  //   title: 'Date',
  //   dataIndex: 'blockNumber',
  //   configuration: {
  //     render: (field: any, record: Transaction) => {
  //       return record?.blockNumber?.toString() + '.' + record?.transactionIndex?.toString();
  //     },
  //     width: 120,
  //   },
  // }),
  // addNumColumn({
  //   title: 'Transaction Index',
  //   dataIndex: 'transactionIndex',
  //   configuration: {
  //     width: 100,
  //   },
  // }),
  // addColumn({
  //   title: 'Timestamp',
  //   dataIndex: 'timestamp',
  // }),
  addColumn({
    title: 'Date',
    dataIndex: 'date',
    configuration: {
      render: (field: any, record: Transaction) => {
        if (!record) return <div></div>;
        return (
          <pre>
            <div>{record.date}</div>
            <div style={{ fontSize: 'small', fontStyle: 'italic' }}>
              {record.blockNumber?.toString() + '.' + record.transactionIndex?.toString()}
            </div>
          </pre>
        );
      },
      width: 250,
    },
  }),
  addColumn({
    title: 'From / To',
    dataIndex: 'from',
    configuration: {
      width: 400,
      render: (value: any, record: Transaction) => {
        if (!record) return <div></div>;
        const from = value === record.extraData ? <div style={{ color: 'red' }}>{value}</div> : value;
        const to = record.to === record.extraData ? <div style={{ color: 'red' }}>{record.to}</div> : record.to;
        return (
          <pre>
            <div>{from}</div>
            <div>{to}</div>
          </pre>
        );
      },
    },
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
      width: 50,
    },
  }),
  addFlagColumn({
    title: 'Tok',
    dataIndex: 'hasToken',
    configuration: {
      width: 50,
    },
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
    dataIndex: 'function',
  }),
  addColumn({
    title: 'Reconciled',
    dataIndex: 'statements',
    configuration: {
      render: (statements: any) => {
        if (statements?.length) return statements?.length + '-' + (statements[0].reconciled ? 'true' : 'false');
        return 'false';
      },
    },
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
    configuration: {
      render: (value) => {
        return value;
      },
    },
  }),
  /*
    blknum_t blockNumber;
    blknum_t transactionIndex;
    timestamp_t timestamp;
    string_q asset;
    uint64_t decimals;
    bigint_t begBal;
    bigint_t begBalDiff;
    bigint_t amountIn;
    bigint_t amountOut;
    bigint_t internalIn;
    bigint_t internalOut;
    bigint_t selfDestructIn;
    bigint_t selfDestructOut;
    bigint_t minerBaseRewardIn;
    bigint_t minerNephewRewardIn;
    bigint_t minerTxFeeIn;
    bigint_t minerUncleRewardIn;
    bigint_t prefundIn;
    bigint_t gasCostOut;
    bigint_t endBal;
    bigint_t endBalCalc;
    bigint_t endBalDiff;
    bigint_t amountNet;
    string_q reconciliationType;
    bool reconciled;
  */
  addColumn({
    title: 'Gas Cost',
    dataIndex: 'statements',
    configuration: {
      render: (statements: any) => {
        if (statements?.length) {
          return statements[0].gasCostOut;
        }
        return '0.0';
      },
    },
  }),
  addColumn({
    title: 'Statement',
    dataIndex: 'statements',
    configuration: {
      render: (statements: any) => {
        if (statements?.length) {
          return statements[0].endBal;
        }
        return '0.0';
      },
    },
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
