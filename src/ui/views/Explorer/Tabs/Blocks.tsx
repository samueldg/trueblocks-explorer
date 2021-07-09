import { addColumn, addNumColumn, BaseTable, TableActions } from '@components/Table';
import { createErrorNotification } from '@modules/error_notification';
import { Block } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';

export const Blocks = () => {
  const [blocks, loading] = useCommand('blocks', { list: 0, list_count: 12, cache: true });
  if (blocks.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch blocks',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <BaseTable dataSource={getData(blocks)} columns={blockListSchema} loading={loading} />;
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
      width: 620,
    },
  }),
  addColumn<Block>({
    title: 'Miner',
    dataIndex: 'miner',
    configuration: {
      render: (value, record) => {
        return (
          <div>
            <div>{value}</div>
            <div style={{ fontStyle: 'italic' }}>
              {record.unclesCnt === null || record.unclesCnt === 0 ? '' : record.unclesCnt + ' uncle'}
            </div>
          </div>
        );
      },
      width: 400,
    },
  }),
  addNumColumn<Block>({
    title: 'Difficulty',
    dataIndex: 'difficulty',
    configuration: {
      width: 180,
    },
  }),
  addNumColumn<Block>({
    title: 'Gas Used',
    dataIndex: 'gasUsed',
  }),
  addNumColumn<Block>({
    title: 'Gas Limit',
    dataIndex: 'gasLimit',
  }),
  addNumColumn<Block>({
    title: 'nTransactions',
    dataIndex: 'transactionsCnt',
  }),
];

function getTableActions(item: Block) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
