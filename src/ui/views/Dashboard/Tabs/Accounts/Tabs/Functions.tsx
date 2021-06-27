import { LogArray, Transaction } from '@modules/types';
import { Card } from 'antd';
import React from 'react';
import { useAcctStyles } from '../AccountStyles';

export const AccountFunctions = ({ record }: { record: Transaction }) => {
  const styles = useAcctStyles();
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.cardHolder}>
        <Card
          className={styles.card}
          headStyle={{
            backgroundColor: 'indianred',
          }}
          hoverable={true}
          title={'Input'}>
          <b>Input bytes:</b>
          {showInput(record.input)}
          <br />
          <b>Json Object:</b>
          <div>{JSON.stringify(record.articulatedTx)}</div>
          <br />
          <b>Compressed Tx:</b>
          <div>{JSON.stringify(record.compressedTx).replace(/\"/g, '|').replace(/"/g, '')}</div>
        </Card>
        <Card
          className={styles.card}
          headStyle={{
            backgroundColor: 'indianred',
          }}
          hoverable={true}
          title={'Events'}>
          {'events'}
        </Card>

        {/* <div style={{ margin: '2px', border: '1px solid black' }}>{showInput(record.input)}</div>
        <div style={{ margin: '2px', border: '1px solid black' }}>{JSON.stringify(record.articulatedTx, null, 2)}</div>
        <div style={{ margin: '2px', border: '1px solid black' }}>{showLogs(record.receipt.logs)}</div> */}
      </div>
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
