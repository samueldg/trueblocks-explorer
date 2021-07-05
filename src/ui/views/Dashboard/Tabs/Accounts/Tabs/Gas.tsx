import { Transaction } from '@modules/types';
import React from 'react';

export const AccountGas = ({ record }: { record: Transaction }) => {
  return <div>{JSON.stringify(record, null, 2)}</div>;
};
