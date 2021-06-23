import { addColumn, addNumColumn, BaseTableRows, TableActions } from '@components/Table';
import { createErrorNotification } from '@modules/error_notification';
import { Block } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';

export const Blocks = () => {
  const [blocks, loading] = useCommand('blocks', { list: 0, list_count: 20, cache: true });
  if (blocks.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch blocks',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <BaseTableRows data={getData(blocks)} columns={blockListSchema} loading={loading} />;
};

const blockListSchema: ColumnsType<Block> = [
  addColumn<Block>({
    title: 'Date',
    dataIndex: 'timestamp',
    configuration: {
      render: (value) => {
        return (
          <div>
            <div>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div style={{ fontStyle: 'italic' }}>{moment.unix(value).fromNow()}</div>
          </div>
        );
      },
    },
  }),
  addColumn<Block>({
    title: 'Hash',
    dataIndex: 'hash',
    configuration: {
      render: (value, record) => {
        return (
          <div>
            <div>{value}</div>
            <div style={{ fontStyle: 'italic' }}>{Intl.NumberFormat().format(record.blockNumber)}</div>
          </div>
        );
      },
      width: 650,
    },
  }),
  addNumColumn<Block>({
    title: 'nTransactions',
    dataIndex: 'transactionsCnt',
  }),
  addNumColumn<Block>({
    title: 'Uncles',
    dataIndex: 'unclesCnt',
  }),
  addNumColumn<Block>({
    title: 'Gas Limit',
    dataIndex: 'gasLimit',
  }),
  addNumColumn<Block>({
    title: 'Gas Used',
    dataIndex: 'gasUsed',
  }),
];

function getTableActions(item: Block) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
