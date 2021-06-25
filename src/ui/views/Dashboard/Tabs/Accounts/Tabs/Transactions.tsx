import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { addColumn, addFlagColumn, BaseTableRows } from '@components/Table';
import { Reconciliation, ReconciliationArray, Transaction } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { createUseStyles } from 'react-jss';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

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
  addColumn({
    title: 'Reconciliations (asset, beg, out, gasOut, in, end, check)',
    dataIndex: 'compressedTx',
    configuration: {
      render: (item, record) => {
        return (
          <div style={{ border: '1px solid brown' }}>
            <div style={{ fontSize: '12pt', fontWeight: 600, backgroundColor: 'indianred', color: 'yellow' }}>
              {item}
            </div>
            <div>{renderStatements(record.statements, 'ETH')}</div>
            <div>{renderStatements(record.statements, '')}</div>
          </div>
        );
      },
      width: 900,
    },
  }),
  addColumn({
    title: '',
    dataIndex: 'statements',
    configuration: {
      render: (item) => '',
      width: 300,
    },
  }),
  // addColumn({
  //   title: 'Token Reconciliations (asset, beg, out, gasOut, in, end, check)',
  //   dataIndex: 'statements',
  //   configuration: {
  //     render: (statements) => renderStatements(statements, ''),
  //     width: 750,
  //   },
  // }),
];

export const renderStatements = (statements: ReconciliationArray, asset: string) => {
  const styles = useStyles();
  if (statements === null) return <></>;
  return (
    <table className={style.table}>
      <tbody>
        {statements?.map((statement) => {
          let show = true;
          if (statement.asset === 'ETH') show = asset === 'ETH' ? true : false;
          else show = asset === 'ETH' ? false : true;
          if (!show) return <></>;
          return (
            <Statement
              key={statement.blockNumber * 100000 + statement.transactionIndex + statement.asset}
              statement={statement}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const ReconIcon = ({ reconciled }: { reconciled: boolean }) => {
  return (
    <div>
      {reconciled ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}
    </div>
  );
};

const Statement = ({ statement }: { statement: Reconciliation }) => {
  const styles = useStyles();
  return (
    <tr className={styles.row} key={statement.asset}>
      <td key={1} className={styles.col} style={{ width: '12%' }}>
        {statement.asset.slice(0, 5)}
      </td>
      <td key={2} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.begBal)}
      </td>
      <td key={3} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.amountOut)}
      </td>
      <td key={4} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.gasCostOut)}
      </td>
      <td key={5} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.amountIn)}
      </td>
      <td key={6} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.endBal)}
      </td>
      <td key={7} className={styles.col} style={{ width: '4%' }}>
        <ReconIcon reconciled={statement.reconciled} />
      </td>
    </tr>
  );
};

const clip = (num: string) => {
  const parts = num.split('.');
  if (parts.length === 0 || parts[0] === '') return <div style={{ color: 'lightgrey' }}>{'0.0000000'}</div>;
  if (parts.length === 1) return parts[0] + '.0000000';
  return parts[0] + '.' + parts[1].substr(0, 7);
};

const useStyles = createUseStyles({
  table: {},
  row: {},
  col: {
    textAlign: 'right',
    backgroundColor: '#fff7e6',
  },
});
