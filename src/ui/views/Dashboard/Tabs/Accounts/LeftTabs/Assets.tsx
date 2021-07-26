import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reconciliation, Transaction, TransactionArray, AssetHistory, ReconciliationArray } from '@modules/types';
import { MyAreaChart } from '@components/MyAreaChart';
import { BaseTable, addColumn } from '@components/Table';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { chartColors } from '../../../../../Utilities';
import dayjs from 'dayjs';
import useGlobalState from '../../../../../GlobalState';

export const Assets = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  const { names } = useGlobalState();

  if (!theData) return <></>;

  let uniqAssets: any = [];
  theData.map((tx: Transaction) => {
    tx.statements?.map((statement: Reconciliation) => {
      if (uniqAssets.find((asset: AssetHistory) => asset.assetSymbol === statement.assetSymbol) === undefined) {
        uniqAssets.push({
          color: chartColors[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
          assetAddr: statement.assetAddr,
          assetSymbol: statement.assetSymbol,
          history: [],
        });
      }
    });

    uniqAssets.map((record: AssetHistory, i: number) => {
      const found = tx.statements?.find((s: any) => s.assetSymbol === record.assetSymbol);
      if (found) {
        uniqAssets[i].history = [
          ...uniqAssets[i].history,
          { balance: found.endBal, date: new Date(found.timestamp * 1000) },
        ];
      }
    });
  });

  uniqAssets = uniqAssets.filter((record: AssetHistory) => {
    return record.history.length > 1 || (record.history.length === 1 && Number(record.history[0].balance) > 0);
  });

  uniqAssets.sort(function (a: any, b: any) {
    if (b.history.length === a.history.length) {
      if (b.history.length === 0) {
        return b.assetSymbol - a.assetSymbol;
      }
      return b.history[b.history.length - 1].balance - a.history[a.history.length - 1].balance;
    }
    return b.history.length - a.history.length;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
      {uniqAssets.map((asset: any, index: number) => {
        const color = chartColors[index % chartColors.length] || '#63b598';
        const columns: any[] = [
          addColumn({
            title: 'Date',
            dataIndex: 'date',
          }),
          addColumn({
            title: asset.assetSymbol,
            dataIndex: asset.assetSymbol,
          }),
        ];
        const title = (
          <div key={index + 'd1'} style={{ overflowX: 'hidden' }}>
            {asset.assetSymbol === 'ETH'
              ? asset.assetSymbol
              : names[asset.assetAddr]
              ? names[asset.assetAddr].name?.substr(0, 15) + ' (' + asset.assetSymbol + ')'
              : asset.assetSymbol}
            <br />
            <small>({asset.history.length} txs)</small>
          </div>
        );
        const table = false;
        const items = asset.history.map((item: any) => {
          return {
            date: dayjs(item.date).format('YYYY-MM-DD'),
            [asset.assetSymbol]: parseFloat(item.balance || 0),
          };
        });

        return <MyAreaChart key={index} items={items} columns={columns} index={index} title={title} table={table} />;
      })}
    </div>
  );
};
