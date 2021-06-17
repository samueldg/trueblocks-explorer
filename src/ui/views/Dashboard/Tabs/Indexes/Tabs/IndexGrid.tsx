import { addColumn, addNumColumn, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { MonitorType } from '@modules/data/monitor';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const IndexGrid = () => {
  const [indexes, loading] = useCommand('status', { mode: 'index', details: true });
  if (indexes.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch indexes',
    });
  }

  const getData = useCallback((response) => {
    return (
      response.status === 'fail' || !response.data[0].caches ? [] : response.data[0].caches[0].items
    );
  }, []);

  return (
    <div>Grid view</div>
  );
};

const indexSchema: ColumnsType<MonitorType> = [
  addColumn({
    title: 'FileDate',
    dataIndex: 'fileDate',
  }),
  addNumColumn({
    title: 'nAddresses',
    dataIndex: 'nAddresses',
  }),
  addNumColumn({
    title: 'nAppearances',
    dataIndex: 'nAppearances',
  }),
  addNumColumn({
    title: 'firstAppearance',
    dataIndex: 'firstAppearance',
  }),
  addNumColumn({
    title: 'latestAppearance',
    dataIndex: 'latestAppearance',
  }),
  addNumColumn({
  title: 'firstTs',
  dataIndex: 'firstTs',
  }),
  addNumColumn({
    title: 'latestTs',
    dataIndex: 'latestTs',
  }),
  addNumColumn({
    title: 'indexSizeBytes',
    dataIndex: 'indexSizeBytes',
  }),
  addNumColumn({
    title: 'bloomSizeBytes',
    dataIndex: 'bloomSizeBytes',
  }),
  addColumn({
    title: 'index_hash',
    dataIndex: 'index_hash',
  }),
  addColumn({
    title: 'bloom_hash',
    dataIndex: 'bloom_hash',
  }),
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
