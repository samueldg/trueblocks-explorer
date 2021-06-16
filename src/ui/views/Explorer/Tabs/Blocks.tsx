import { addColumn, BaseTableRows, TableActions } from '@components/Table';
import { BlockType } from '@modules/data/block';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';

export const Blocks = () => {
  const [blocks, loading] = useCommand('blocks', { list: 0, cache: true });
  if (blocks.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch blocks',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <BaseTableRows data={getData(blocks)} columns={blockSchema} loading={loading} />
};

const blockSchema: ColumnsType<BlockType> = [
  addColumn<BlockType>({
    title: 'Hash',
    dataIndex: 'hash',
  }),
  addColumn<BlockType>({
    title: 'Block Number',
    dataIndex: 'blockNumber',
  }),
  addColumn<BlockType>({
    title: 'Timestamp',
    dataIndex: 'timestamp',
  }),
  addColumn<BlockType>({
    title: 'Date',
    dataIndex: 'date',
  }),
  addColumn<BlockType>({
    title: 'nTransactions',
    dataIndex: 'transactionsCnt',
  }),
  addColumn<BlockType>({
    title: 'Uncles',
    dataIndex: 'unclesCnt',
  }),
];

function getTableActions(item: BlockType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
