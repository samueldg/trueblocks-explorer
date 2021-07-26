import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Reconciliation, Transaction, TransactionArray } from '@modules/types';
import { AssetHistory } from '@modules/types';

import { BaseTable, addColumn } from '@components/Table';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { chartColors } from '../../Utilities';
import dayjs from 'dayjs';

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
      <div
        key={index + 'd2'}
        style={
          table
            ? { display: 'grid', gridTemplateColumns: '1fr 3fr' }
            : { width: '100%', height: '200px', minWidth: '1' }
        }>
        {/* <div key={index + 'd2'} style={{ width: '100%', height: '200px', minWidth: '1' }}> */}
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
