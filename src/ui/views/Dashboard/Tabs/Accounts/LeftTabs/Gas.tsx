import { ReconciliationArray, TransactionArray } from '@modules/types';
import React from 'react';

export const Gas = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  return (
    <div>
      <div style={{ width: '30%', backgroundColor: 'orange', color: 'black' }}>This module is not completed.</div>
      <div>Gas</div>
    </div>
  );
};
