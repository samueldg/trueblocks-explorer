import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reconciliation, Transaction, TransactionArray } from '@modules/types';
import { address, blknum, int256, timestamp, uint64 } from '@modules/types';

import { BaseTable, addColumn } from '@components/Table';
import { ColumnsType } from 'antd/lib/table';
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
      {uniqAssets.map((asset: any, index: number) => {
        const color = chartColors[index % chartColors.length] || '#63b598';
        const schema: any[] = [
          addColumn({
            title: 'Date',
            dataIndex: 'date',
          }),
          addColumn({
            title: asset.assetSym,
            dataIndex: asset.assetSym,
          }),
        ];
        const title = (
          <div key={index + 'd1'}>
            {asset.assetSym}
            <br />
            <small>({asset.history.length} txs)</small>
          </div>
        );
        const table = false;

        return (
          <div key={index} style={table ? { display: 'grid', gridTemplateRows: '1fr 8fr' } : {}}>
            {title === null ? <></> : <h2>{title}</h2>}
            <div key={index + 'd2'} style={{ width: '100%', height: '200px', minWidth: '1' }}>
              <ResponsiveContainer width='100%' height='100%' minWidth='500' minHeight='400'>
                <AreaChart
                  data={asset.history.map((item: any) => {
                    return {
                      date: dayjs(item.date).format('YYYY-MM-DD'),
                      [asset.assetSym]: parseFloat(item.balance || 0),
                    };
                  })}
                  margin={margins}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey={schema[0].dataIndex} />
                  <YAxis dataKey={schema[1].dataIndex} />
                  <Area type='monotone' dataKey={schema[1].dataIndex} stackId='1' stroke={color} fill={color} />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const MyAreaChart = ({
  items,
  columns = [],
  index = -1,
  title = null,
  table = false,
}: {
  items: any[];
  columns?: any[];
  index?: number;
  title?: any;
  table?: boolean;
}) => {
  if (columns.length < 2) {
    return <>{'Schema must have at least two fields in MyAreaChart'}</>;
  }
  const color = index === -1 ? '#63b598' : chartColors[index % chartColors.length] || '#63b598';
  return (
    <div key={index} style={table ? { display: 'grid', gridTemplateRows: '1fr 8fr' } : {}}>
      {title === null ? <></> : <h2>{title}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {table ? <BaseTable dataSource={items} columns={columns} loading={false} defPageSize={10} /> : <></>}
        <ResponsiveContainer width='100%' height='100%' minWidth='500' minHeight='400'>
          <AreaChart width={500} height={400} data={items} margin={margins}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={columns[0].dataIndex} />
            <YAxis dataKey={columns[1].dataIndex} />
            <Area type='monotone' dataKey={columns[1].dataIndex} stackId='1' stroke={color} fill={color} />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const margins = {
  top: 10,
  right: 30,
  left: 0,
  bottom: 0,
};
