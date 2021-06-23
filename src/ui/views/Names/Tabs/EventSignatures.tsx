import { addActionsColumn, addColumn, BaseTableRows, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { Function } from '@modules/types';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const EventSignatures = () => {
  const [signatures, loading] = useCommand('abis', { known: true, source: true, verbose: 2 });
  if (signatures.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch signatures',
    });
  }

  const getData = useCallback((response) => {
    return response.status === 'fail' ? [] : response.data.filter((item: Function) => item.type === 'event');
  }, []);
  return <BaseTableRows data={getData(signatures)} columns={signatureSchema} loading={loading} />;
};

const signatureSchema: ColumnsType<Function> = [
  addColumn<Function>({
    title: 'Source',
    dataIndex: 'abi_source',
    configuration: {
      width: 200,
    },
  }),
  addColumn<Function>({
    title: 'Encoding',
    dataIndex: 'encoding',
  }),
  addColumn<Function>({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn<Function>({
    title: 'Signature',
    dataIndex: 'signature',
  }),
  addActionsColumn<Function>(
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

function getTableActions(item: Function) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
