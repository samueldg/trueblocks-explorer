import {
  addActionsColumn, addColumn,

  TableActions,
} from '@components/Table';
import { When } from '@modules/data/when';
import Table, { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';
import React from 'react';

function getTableActions(item: When) {
  return (
    <TableActions
      item={item}
      onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)}
    />
  );
}

export const WhenTable = ({
  getWhen,
  loadingWhen,
}: {
  getWhen: () => When[],
  loadingWhen: boolean,
}) => {
  const onTagClick = (tag: string) => console.log('tag click', tag);

  const columns: ColumnsType<When> = [
    addColumn<When>({
      title: 'ID',
      dataIndex: 'blockNumber',
    }),
    addColumn({
      title: 'Name',
      dataIndex: 'name',
    }),
    addColumn({
      title: 'Timestamp',
      dataIndex: 'timestamp',
    }),
    addColumn({
      title: 'Date',
      dataIndex: 'date',
    }),
    addActionsColumn<When>({
      title: '',
      dataIndex: '',
    }, {
      width: 150,
      getComponent: getTableActions,
    }),
  ];

  const rowKey: GetRowKey<When> = ({ blockNumber }, index) => `${blockNumber}${index}`;

  return (
    <Table<When>
      rowKey={rowKey}
      columns={columns}
      dataSource={getWhen()}
      loading={loadingWhen}
      size="small"
      scroll={{ x: 1300 }}
    />
  );
};
