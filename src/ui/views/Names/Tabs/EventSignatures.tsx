import { addActionsColumn, addColumn, BaseTableRows, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { SignatureType } from '@modules/data/signature';
import { createErrorNotification } from '@modules/error_notification';
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
    return response.status === 'fail' ? [] : response.data.filter((item: SignatureType) => item.type === 'event');
  }, []);
  return <BaseTableRows data={getData(signatures)} columns={signatureSchema} loading={loading} />;
};

const signatureSchema: ColumnsType<SignatureType> = [
  addColumn<SignatureType>({
    title: 'Source',
    dataIndex: 'abi_source',
    configuration: {
      width: 200,
    },
  }),
  addColumn<SignatureType>({
    title: 'Encoding',
    dataIndex: 'encoding',
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
