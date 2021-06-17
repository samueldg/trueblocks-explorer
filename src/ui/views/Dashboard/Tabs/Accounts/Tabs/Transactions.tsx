import { BaseTableRows } from '@components/Table';
import { transactionSchema } from '@modules/data/transaction';
import React from 'react';

export const AccountTransactions = ({data, columns, loading}: {data:any, columns?: any, loading: boolean}) => {
  return <BaseTableRows data={data} columns={columns ? columns : transactionSchema} loading={loading} />;
};
