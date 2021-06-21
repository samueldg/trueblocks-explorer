import { BaseTableRows } from '@components/Table';
import { functionSchema } from '@modules/data/transaction';
import React from 'react';

export const AccountFunctions = ({ data, columns, loading }: { data: any; columns?: any; loading: boolean }) => {
  return <BaseTableRows data={data} columns={columns ? columns : functionSchema} loading={loading} />;
};
