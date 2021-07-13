import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { chartColors } from './colors';

export default function AccountCharts({ data }: { data: any }) {
  const uniqueAssets: any = [];

  const historyETH: any = [];
  const historyDAI: any = [];

  data &&
    data.data.map((item: any) => {
      item.statements?.map((asset: any) => {
        if (uniqueAssets.find((a: any) => a.asset === asset.assetSymbol) === undefined) {
          uniqueAssets.push({
            asset: asset.assetSymbol,
            data: [],
            color: chartColors[Math.floor(Math.random() * (9 - 0 + 1) + 0)],
          });
        }
      });
      uniqueAssets.map((record: any, i: number) => {
        const foundStatement = item.statements?.find((s: any) => s.assetSymbol === record.asset);
        if (foundStatement) {
          uniqueAssets[i].data = [
            ...uniqueAssets[i].data,
            { endBal: foundStatement.endBal, date: new Date(foundStatement.timestamp * 1000) },
          ];
        }
      });
      /*const statementETH = item.statements?.find((s: any) => s.assetSymbol === 'ETH');
      const statementDAI = item.statements?.find((s: any) => s.assetSymbol === 'DAI');
      if (statementETH) {
        historyETH.push({ endBal: statementETH.endBal, date: new Date(statementETH.timestamp * 1000) });
      }
      if (statementDAI) {
        historyDAI.push({ endBal: statementDAI.endBal, date: new Date(statementETH.timestamp * 1000) });
      }*/
    });

  /*data && uniqueAssets.length > 0 && data.data.map((item: any) => {
      item.statements?.map()
    })*/

  const testDataETH = historyETH.map((item: any) => {
    return {
      name: dayjs(item.date).format('MM/DD/YYYY'),
      ETH: parseFloat(item.endBal || 0),
    };
  });

  const testDataDAI = historyDAI.map((item: any) => {
    return {
      name: dayjs(item.date).format('MM/DD/YYYY'),
      DAI: parseFloat(item.endBal || 0),
    };
  });

  return (
    <div>
      {uniqueAssets.map((asset: any, i: number) => (
        <div key={i}>
          <div key={i + 'd1'} style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>
            {asset.asset}
          </div>
          <div key={i + 'd2'} style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                width={500}
                height={400}
                data={asset.data.map((item: any) => {
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
                  stroke={chartColors[i] || '#63b598'}
                  fill={chartColors[i] || '#63b598'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
