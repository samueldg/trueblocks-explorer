import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BaseTable, addColumn } from '@components/Table';
import { ReconciliationArray, TransactionArray } from '@modules/types';

import { ColumnsType } from 'antd/lib/table';
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
    item.receipt.logs.map((item: any) => {
      if (item.articulatedLog) {
        if (!counts[item.articulatedLog?.name]) counts[item.articulatedLog?.name] = 1;
        else counts[item.articulatedLog?.name] = Number(counts[item.articulatedLog?.name]) + 1;
      }
    });
  });

  const uniqItems: any = [];
  Object.keys(counts).map((key: any) => {
    uniqItems.push({
      func: key,
      count: counts[key],
      // color: chartColors[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
    });
  });

  uniqItems.sort(function (a: any, b: any) {
    if (b.count === a.count) return a.func - b.func;
    return b.count - a.count;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr' }}>
      <BaseTable dataSource={uniqItems} columns={countSchema} loading={false} defPageSize={10} />
      <div>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={uniqItems}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='func' />
            <YAxis dataKey='count' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey={'count'}
              stackId='1'
              // stroke={chartColors[i % chartColors.length] || '#63b598'}
              // fill={chartColors[i % chartColors.length] || '#63b598'}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div></div>
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

/*
          <PieChart width={730} height={250}>
            <Pie
              data={uniqItems}
              cx='50%'
              cy='50%'
              dataKey='count' // make sure to map the dataKey to "value"
              innerRadius={10} // the inner and outer radius helps to create the progress look
              outerRadius={80}>
              {uniqItems.map((entry: any, index: number) => {
                if (index === 1) {
                  return <Cell key={`cell-${index}`} fill='#f3f6f9' />; // make sure to map the index to the colour you want
                }
                return <Cell key={`cell-${index}`} fill='green' />;
              })}
              <Label
                value={uniqItems[0].func}
                position='center'
                fill='grey'
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                }}
              />
            </Pie>
          </PieChart>
 */
