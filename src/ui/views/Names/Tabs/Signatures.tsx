import { addActionsColumn, addColumn, RowBasedTable, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { SignatureType } from '@modules/data/signature';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const Signatures = () => {
  const [signatures, loading] = useCommand('abis', { known: true, source: true, verbose: 2 });
  if (signatures.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch signatures',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return <RowBasedTable data={getData(signatures)} columns={signatureSchema} loading={loading} />;
};

const signatureSchema: ColumnsType<SignatureType> = [
  addColumn<SignatureType>({
    title: 'Source',
    dataIndex: 'abi_source',
  }),
  addColumn<SignatureType>({
    title: 'Encoding',
    dataIndex: 'encoding',
  }),
  addColumn<SignatureType>({
    title: 'Type',
    dataIndex: 'type',
  }),
  addColumn<SignatureType>({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn<SignatureType>({
    title: 'Signature',
    dataIndex: 'signature',
  }),
  addActionsColumn<SignatureType>(
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

function getTableActions(item: SignatureType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
