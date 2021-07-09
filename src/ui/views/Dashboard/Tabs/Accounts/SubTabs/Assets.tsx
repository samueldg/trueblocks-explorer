import { BaseTable } from '@components/Table';
import React from 'react';

export const AccountAssets = () => {
  const vals = [{ val: 1 }, { val: 2 }, { val: 2 }, { val: 2 }, { val: 2 }, { val: 2 }];
  return <BaseTable dataSource={vals} columns={[{ title: 'Val', dataIndex: 'val' }]} loading={false} />;
};
