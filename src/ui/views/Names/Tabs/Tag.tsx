import { addActionsColumn, addColumn, BaseTable, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { Tag } from '@modules/types/Tag';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const Tags = () => {
  const [tags, loading] = useCommand('names', { tags: true });
  if (tags.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch tags',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <BaseTable data={getData(tags)} columns={tagSchema} loading={loading} />;
};

const tagSchema: ColumnsType<Tag> = [
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

function getTableActions(item: Tag) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
