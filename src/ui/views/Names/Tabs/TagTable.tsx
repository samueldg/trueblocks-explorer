import {addActionsColumn, addColumn, TableActions} from '@components/Table';
import {Tag} from '@modules/data/tag';
import Table, {ColumnsType} from 'antd/lib/table';
import {GetRowKey} from 'antd/lib/table/interface';
import React from 'react';

function getTableActions(item: Tag) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}

export const TagTable = ({getTag, loadingTag}: {getTag: () => Tag[]; loadingTag: boolean}) => {
  const onTagClick = (tag: string) => console.log('tag click', tag);

  const columns: ColumnsType<Tag> = [
    addColumn<Tag>({
      title: 'ID',
      dataIndex: 'tags',
    }),
    addActionsColumn<Tag>(
      {
        title: '',
        dataIndex: '',
      },
      {
        width: 150,
        getComponent: getTableActions,
      }
    ),
  ];

  const rowKey: GetRowKey<Tag> = ({tag}, index) => `${tag}${index}`;

  return (
    <Table<Tag>
      rowKey={rowKey}
      columns={columns}
      dataSource={getTag()}
      loading={loadingTag}
      size='small'
      scroll={{x: 1300}}
    />
  );
};
