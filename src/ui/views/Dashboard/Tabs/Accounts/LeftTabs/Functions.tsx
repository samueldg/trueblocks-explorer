import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { BaseTable, addColumn } from '@components/Table';
import { ReconciliationArray, TransactionArray } from '@modules/types';

import { ColumnsType } from 'antd/lib/table';
import { MyAreaChartWithTable } from '@components/AccountCharts';
import React from 'react';
import { Transaction } from '@modules/types';

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
    const v = item.articulatedTx;
    if (v) {
      const k = v?.name + (item.isError ? ' (errored)' : '');
      if (!counts[k]) counts[k] = 1;
      else counts[k] = Number(counts[k]) + 1;
    }
  });

  const uniqItems: any = [];
  Object.keys(counts).map((key: any) => {
    uniqItems.push({
      func: key,
      count: counts[key],
    });
  });

  uniqItems.sort(function (a: any, b: any) {
    if (b.count === a.count) return a.func - b.func;
    return b.count - a.count;
  });

  const top = uniqItems.filter((item: any, i: number) => i < 10);
  const remains = uniqItems.filter((item: any, i: number) => i >= 10);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <MyAreaChartWithTable
        title={'Top Ten Functions'}
        items={top}
        xField={'func'}
        yField={'count'}
        schema={countSchema}
      />
      <MyAreaChartWithTable
        title={'Other Functions'}
        items={remains}
        xField={'func'}
        yField={'count'}
        schema={countSchema}
      />
    </div>
  );
};

export const countSchema: ColumnsType<Transaction> = [
  addColumn({
    title: 'Function',
    dataIndex: 'func',
  }),
  addColumn({
    title: 'Count',
    dataIndex: 'count',
  }),
];
