import { addActionsColumn, addColumn, addNumColumn, BaseTableRows, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { WhenType } from '@modules/data/when';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const When = () => {
  const [when, loading] = useCommand('when', { list: true });
  if (when.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch when blocks',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <BaseTableRows data={getData(when)} columns={whenSchema} loading={loading} />;
};

const whenSchema: ColumnsType<WhenType> = [
  addNumColumn({
    title: 'Block Number',
    dataIndex: 'blockNumber',
    configuration: {
      width: 100,
    }
  }),
  addColumn({
    title: 'Date',
    dataIndex: 'date',
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Timestamp',
    dataIndex: 'timestamp',
  }),
  addActionsColumn({
    title: '',
    dataIndex: '',
  },
  {
    width: 150,
    getComponent: getTableActions,
  }),
];

function getTableActions(item: WhenType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
