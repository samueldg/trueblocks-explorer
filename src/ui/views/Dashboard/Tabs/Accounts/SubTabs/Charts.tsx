import { ReconciliationArray, TransactionArray } from '@modules/types';
import React from 'react';
import AccountCharts from '@components/AccountCharts';

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
