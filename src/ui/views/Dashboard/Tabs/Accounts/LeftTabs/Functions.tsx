import { ReconciliationArray, TransactionArray } from '@modules/types';

import React from 'react';

export const Functions = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  if (!theData) return <></>;

  const counts = Object.create(null);
  theData.forEach((item: any, i: number) => {
    if (!counts[item.articulatedTx?.name]) counts[item.articulatedTx?.name] = 1;
    else counts[item.articulatedTx?.name] = Number(counts[item.articulatedTx?.name]) + 1;
  });
  Object.keys(counts).map((item: any) => {
    console.log(item);
  });

  // uniqueFuncs.keys.sort(function (a: any, b: any) {
  //   return b - a;
  // });

  return <pre>{JSON.stringify(counts, null, 2)}</pre>;
};
