import { Transaction } from '@modules/types';
import React from 'react';

export const AccountGas = ({ record }: { record: Transaction }) => {
  return <>{JSON.stringify(record, null, 2)}</>;
};
