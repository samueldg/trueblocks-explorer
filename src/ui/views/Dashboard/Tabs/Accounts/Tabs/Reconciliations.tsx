import { Reconciliation, Transaction } from '@modules/types';
import { Card } from 'antd';
import React from 'react';
import { createUseStyles } from 'react-jss';

//-----------------------------------------------------------------
export const AccountReconciliations = ({ record }: { record: Transaction }) => {
  const styles = useStyles();
  const cards = record.statements.map((statement: Reconciliation) => renderStatement(statement));
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.cardHolder}>{cards}</div>
      <div></div>
    </div>
  );
};

//-----------------------------------------------------------------
const renderStatement = (statement: Reconciliation) => {
  const styles = useStyles();
  const table = <pre style={{ overflowX: 'clip' }}>{JSON.stringify(statement, null, 2)}</pre>;
  return (
    <Card
      className={styles.card}
      headStyle={{
        backgroundColor: 'indianred',
      }}
      hoverable={true}
      title={statement.assetSymbol + ' reconciliation'}>
      {table}
    </Card>
  );
};

//-----------------------------------------------------------------
const useStyles = createUseStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 28fr 3fr',
  },
  cardHolder: {
    display: 'flex',
    flexWrap: 'nowrap',
    rowGap: '5px',
    border: '1px solid black',
    padding: '3px',
  },
  card: {
    border: '1px solid lightgrey',
    width: '375px',
  },
});
