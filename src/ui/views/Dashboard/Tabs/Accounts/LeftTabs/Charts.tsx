import { ReconciliationArray, TransactionArray } from '@modules/types';

import AccountCharts from '@components/AccountCharts';
import React from 'react';

export const Charts = ({
  theData,
  loading,
  accountAddress,
  data,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
  data: any;
}) => {
  return <AccountCharts data={data} />;
};
