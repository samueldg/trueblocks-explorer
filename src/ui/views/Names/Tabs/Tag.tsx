import { addActionsColumn, addColumn, BaseTableRows, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { TagType } from '@modules/data/tag';
import { createErrorNotification } from '@modules/error_notification';
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
  return <BaseTableRows data={getData(tags)} columns={tagSchema} loading={loading} />;
};

const tagSchema: ColumnsType<TagType> = [
  addColumn<TagType>({
    title: 'ID',
    dataIndex: 'tags',
  }),
  addActionsColumn<TagType>({
    title: '',
    dataIndex: '',
  },
  {
    width: 150,
    getComponent: getTableActions,
  }),
];

function getTableActions(item: TagType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
