import { NamesFilters } from '@components/Filters';
import { addActionsColumn, addColumn, addTagsColumn, RowBasedTable, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { MonitorType } from '@modules/data/monitor';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const Monitors = () => {
  const [monitors, loading] = useCommand('status', { mode: 'monitors', details: true });
  if (monitors.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch monitors',
    });
  }

  const getData = useCallback((response) => {
    return (
      response.status === 'fail' || !response.data[0].caches ? [] : response.data[0].caches[0].items
    );
  }, []);

  return (
    <>
      <NamesFilters />
      <RowBasedTable data={getData(monitors)} columns={monitorSchema} loading={loading} />
    </>
  );
};

const monitorSchema: ColumnsType<MonitorType> = [
  addColumn<MonitorType>({
    title: 'Address',
    dataIndex: 'address',
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addTagsColumn(
    {
      title: 'Tags',
      dataIndex: 'tags',
      configuration: {
        ellipsis: false,
      },
    },
    (tag: string) => console.log('tag click', tag)
  ),
  addColumn({
    title: 'nAppearances',
    dataIndex: 'nAppearances',
    configuration: {
      render: (num: number) => Intl.NumberFormat().format(num),
      align: 'right',
    }
  }),
  addColumn({
    title: 'firstAppearance',
    dataIndex: 'firstAppearance',
    configuration: {
      render: (num: number) => Intl.NumberFormat().format(num),
      align: 'right',
    }
  }),
  addColumn({
    title: 'latestAppearance',
    dataIndex: 'latestAppearance',
    configuration: {
      render: (num: number) => Intl.NumberFormat().format(num),
      align: 'right',
    }
  }),
  addColumn({
    title: 'sizeInBytes',
    dataIndex: 'sizeInBytes',
    configuration: {
      render: (num: number) => Intl.NumberFormat().format(num),
      align: 'right',
    }
  }),
  addActionsColumn<MonitorType>(
    {
      title: `<Button>Add</Button>`,
      dataIndex: '',
      configuration: {
        align: 'right',
      }
    },
    {
      width: 150,
      getComponent: getTableActions,
    }
  ),
];

function getTableActions(item: MonitorType) {
  const onClick = (action: string, item: MonitorType) => {
    switch (action) {
      case 'remove':
        console.log("Deleting the monitor", item);
        break;
      default:
        console.log('Clicked action', action, item)
    }
  }

  return <TableActions item={item} onClick={onClick} />;
}
