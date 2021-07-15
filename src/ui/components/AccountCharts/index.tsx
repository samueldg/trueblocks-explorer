import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import React from 'react';
import { chartColors } from './colors';
import dayjs from 'dayjs';

export default function AccountCharts({ theData }: { theData: any }) {
  if (!theData) return <></>;

  const uniqueAssets: any = [];
  theData.map((item: any) => {
    item.statements?.map((asset: any) => {
      if (uniqueAssets.find((a: any) => a.asset === asset.assetSymbol) === undefined) {
        uniqueAssets.push({
          asset: asset.assetSymbol,
          history: [],
          color: chartColors[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
        });
      }
    });
    uniqueAssets.map((record: any, i: number) => {
      const foundStatement = item.statements?.find((s: any) => s.assetSymbol === record.asset);
      if (foundStatement) {
        uniqueAssets[i].history = [
          ...uniqueAssets[i].history,
          { endBal: foundStatement.endBal, date: new Date(foundStatement.timestamp * 1000) },
        ];
      }
    });
  });

  uniqueAssets.sort(function (a: any, b: any) {
    return b.history.length - a.history.length;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
      {uniqueAssets.map((asset: any, i: number) => (
        <div key={i}>
          <div key={i + 'd1'} style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>
            {asset.asset}
          </div>
          <div key={i + 'd2'} style={{ width: '100%', height: '200px', minWidth: '1' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                width={500}
                height={400}
                data={asset.history.map((item: any) => {
                  return {
                    name: dayjs(item.date).format('MM/DD/YYYY'),
                    [asset.asset]: parseFloat(item.endBal || 0),
                  };
                })}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey={asset.asset}
                  stackId='1'
                  stroke={chartColors[i % chartColors.length] || '#63b598'}
                  fill={chartColors[i % chartColors.length] || '#63b598'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
