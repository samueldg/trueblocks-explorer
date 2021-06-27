import { LogArray, Transaction } from '@modules/types';
import React from 'react';

export const AccountFunctions = ({ record }: { record: Transaction }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 8fr 10fr 10fr 3fr' }}>
      <div></div>
      <div style={{ margin: '2px', border: '1px solid black' }}>{showInput(record.input)}</div>
      <div style={{ margin: '2px', border: '1px solid black' }}>{JSON.stringify(record.articulatedTx, null, 2)}</div>
      <div style={{ margin: '2px', border: '1px solid black' }}>{showLogs(record.receipt.logs)}</div>
      <div></div>
    </div>
  );
};

const showLogs = (logs: LogArray) => {
  return logs.map((log, index) => {
    return (
      <pre key={index}>
        [{index}]: {JSON.stringify(log, null, 2)}
      </pre>
    );
  });
};

const showInput = (str: string) => {
  if (str.length < 10) <pre>{str}</pre>;
  const head = str.slice(0, 10);
  str = str.replace(head, '');
  return (
    <pre>
      <div>{head}</div>
      {str?.match(/.{1,64}/g)?.map((s) => (
        <div>{s}</div>
      ))}
    </pre>
  );
};

// export const functionSchema: ColumnsType<Transaction> = [
//   addNumColumn({
//     title: 'Block Number',
//     dataIndex: 'blockNumber',
//     configuration: {
//       width: 100,
//     },
//   }),
//   addNumColumn({
//     title: 'Transaction ID',
//     dataIndex: 'transactionIndex',
//     configuration: {
//       width: 100,
//     },
//   }),
//   addColumn({
//     title: 'From',
//     dataIndex: 'from',
//     configuration: {
//       width: 150,
//     },
//   }),
//   addColumn({
//     title: 'To',
//     dataIndex: 'to',
//     configuration: {
//       width: 150,
//     },
//   }),
//   addNumColumn({
//     title: 'Ether',
//     dataIndex: 'ether',
//     configuration: {
//       width: 100,
//     },
//   }),
//   addColumn({
//     title: 'Function',
//     dataIndex: 'compressedTx',
//   }),
// ];
