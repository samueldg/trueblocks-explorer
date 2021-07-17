import { ReconciliationArray, TransactionArray } from '@modules/types';

import AccountCharts from '@components/AccountCharts';
import React from 'react';

export const Assets = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  return <AccountCharts theData={theData} />;
};
