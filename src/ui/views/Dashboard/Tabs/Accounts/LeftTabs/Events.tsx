import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { BaseTable, addColumn } from '@components/Table';
import { ReconciliationArray, TransactionArray } from '@modules/types';

import { ColumnsType } from 'antd/lib/table';
import { MyAreaChartWithTable } from '@components/AccountCharts';
import React from 'react';
import { Transaction } from '@modules/types';

export const Events = ({
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
    item.receipt?.logs?.map((item: any) => {
      if (item.articulatedLog) {
        if (!counts[item.articulatedLog?.name]) counts[item.articulatedLog?.name] = 1;
        else counts[item.articulatedLog?.name] = Number(counts[item.articulatedLog?.name]) + 1;
      }
    });
  });

  const uniqItems: any = [];
  Object.keys(counts).map((key: any) => {
    uniqItems.push({
      evt: key,
      count: counts[key],
    });
  });

  uniqItems.sort(function (a: any, b: any) {
    if (b.count === a.count) return a.evt - b.evt;
    return b.count - a.count;
  });

  const top = uniqItems.filter((item: any, i: number) => i < 10);
  const remains = uniqItems.filter((item: any, i: number) => i >= 10);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <MyAreaChartWithTable title={'Top Ten'} items={top} xField={'evt'} yField={'count'} schema={countSchema} />
      <MyAreaChartWithTable title={'Remainder'} items={remains} xField={'evt'} yField={'count'} schema={countSchema} />
      {/* <MyAreaChartWithTable title={''} items={uniqItems} xField={'evt'} yField={'count'} schema={countSchema} /> */}
    </div>
  );
};

export const countSchema: ColumnsType<Transaction> = [
  addColumn({
    title: 'Event',
    dataIndex: 'evt',
  }),
  addColumn({
    title: 'Count',
    dataIndex: 'count',
  }),
];
