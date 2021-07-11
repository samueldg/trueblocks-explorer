import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const testData = [
  {
    name: 'Page A',
    uv: 100,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 100,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function AccountCharts({ data }: { data: any }) {
  const historyETH: any = [];
  const historyDAI: any = [];

  data &&
    data?.data.map((item: any) => {
      const statementETH = item.statements?.find((s: any) => s.assetSymbol === 'ETH');
      const statementDAI = item.statements?.find((s: any) => s.assetSymbol === 'DAI');
      if (statementETH) {
        historyETH.push({ endBal: statementETH.endBal, date: new Date(statementETH.timestamp * 1000) });
      }
      if (statementDAI) {
        historyDAI.push({ endBal: statementDAI.endBal, date: new Date(statementETH.timestamp * 1000) });
      }
    });

  const testDataETH = historyETH.map((item: any) => {
    return {
      name: moment(item.date).format('MM/DD/YYYY'),
      ETH: parseFloat(item.endBal || 0),
    };
  });

  const testDataDAI = historyDAI.map((item: any) => {
    return {
      name: moment(item.date).format('MM/DD/YYYY'),
      DAI: parseFloat(item.endBal || 0),
    };
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>ETH</div>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={testDataETH}
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
            <Area type='monotone' dataKey='ETH' stackId='1' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>DAI</div>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={testDataDAI}
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
            <Area type='monotone' dataKey='DAI' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
