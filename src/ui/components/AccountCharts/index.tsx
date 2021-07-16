import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reconciliation, Transaction, TransactionArray } from '@modules/types';
import { address, blknum, int256, timestamp, uint64 } from '@modules/types';

import React from 'react';
import { chartColors } from './colors';
import dayjs from 'dayjs';

declare type Balance = {
  date: Date;
  balance: int256;
};
declare type BalanceArray = Balance[];

declare type AssetHistory = {
  color: string;
  assetSym: string;
  history: BalanceArray;
};

export default function AccountCharts({ theData }: { theData: TransactionArray }) {
  if (!theData) return <></>;

  let uniqAssets: any = [];
  theData.map((tx: Transaction) => {
    tx.statements?.map((statement: Reconciliation) => {
      if (uniqAssets.find((asset: AssetHistory) => asset.assetSym === statement.assetSymbol) === undefined) {
        uniqAssets.push({
          color: chartColors[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
          assetSym: statement.assetSymbol,
          history: [],
        });
      }
    });

    uniqAssets.map((record: AssetHistory, i: number) => {
      const found = tx.statements?.find((s: any) => s.assetSymbol === record.assetSym);
      if (found) {
        uniqAssets[i].history = [
          ...uniqAssets[i].history,
          { balance: found.endBal, date: new Date(found.timestamp * 1000) },
        ];
      }
    });
  });

  uniqAssets = uniqAssets.filter((record: any) => {
    return record.history.length > 1;
  });
  uniqAssets.sort(function (a: any, b: any) {
    return b.history.length - a.history.length;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
      {uniqAssets.map((asset: any, i: number) => (
        <div key={i}>
          <div key={i + 'd1'} style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>
            {asset.assetSym} ({asset.history.length} txs)
          </div>
          <div key={i + 'd2'} style={{ width: '100%', height: '200px', minWidth: '1' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                width={500}
                height={400}
                data={asset.history.map((item: any) => {
                  return {
                    name: dayjs(item.date).format('MM/DD/YYYY'),
                    [asset.assetSym]: parseFloat(item.balance || 0),
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
                  dataKey={asset.assetSym}
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
