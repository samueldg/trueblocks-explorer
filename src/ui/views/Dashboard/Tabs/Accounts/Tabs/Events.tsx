import { BaseTableRows } from '@components/Table';
import React from 'react';

export const AccountEvents = ({data, columns, loading}: {data:any, columns: any, loading: boolean}) => {
  return <BaseTableRows data={data} columns={columns} loading={loading} />;
};
