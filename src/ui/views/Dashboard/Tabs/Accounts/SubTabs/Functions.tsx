import { LogArray, Transaction } from '@modules/types';
import { Card } from 'antd';
import React from 'react';
import { useAcctStyles } from '../AccountStyles';

//-----------------------------------------------------------------
export const AccountFunctions = ({ record }: { record: Transaction }) => {
  const styles = useAcctStyles();
  if (!record) return <></>;
  return (
    <div key={record.blockNumber + '.' + record.transactionIndex + '-y'} className={styles.container}>
      <div key={record.blockNumber + '.' + record.transactionIndex + '-x'} className={styles.cardHolder}>
        <Card
          key={record.blockNumber + '.' + record.transactionIndex + '-input'}
          className={styles.card}
          headStyle={{
            backgroundColor: 'lightgrey',
          }}
          hoverable={true}
          title={'Input'}>
          {showInput(record)}
        </Card>
        <Card
          key={record.blockNumber + '.' + record.transactionIndex + '-events'}
          className={styles.card}
          headStyle={{
            backgroundColor: 'lightgrey',
          }}
          hoverable={true}
          title={'Events'}>
          {showLogs(record.receipt.logs)}
        </Card>
      </div>
    </div>
  );
};

//-----------------------------------------------------------------
const showLogs = (logs: LogArray) => {
  return logs.map((log, index) => {
    return (
      <pre key={index}>
        [{index}]: {JSON.stringify(log, null, 2)}
      </pre>
    );
  });
};

//-----------------------------------------------------------------
const showInput = (record: Transaction) => {
  let str = record.input;
  if (str.length < 10) <pre>{str}</pre>;
  const head = str.slice(0, 10);
  str = str.replace(head, '');

  const bytes = (
    <pre>
      <div>{head}</div>
      {str?.match(/.{1,64}/g)?.map((s, index) => (
        <div key={index}>{s}</div>
      ))}
    </pre>
  );
  const json = <pre>{JSON.stringify(record.articulatedTx, null, 2)}</pre>;
  const comp = <div>{JSON.stringify(record.compressedTx).replace(/"/g, '')}</div>;
  return (
    <div>
      {oneItem('Json Object', json)}
      {oneItem('Compressed Tx', comp)}
      {oneItem('Input bytes', bytes)}
    </div>
  );
};

//-----------------------------------------------------------------
const oneItem = (title: string, component: React.ReactElement) => {
  return (
    <div>
      <b>
        <u>{title}:</u>
      </b>
      {component}
      <br />
    </div>
  );
};
