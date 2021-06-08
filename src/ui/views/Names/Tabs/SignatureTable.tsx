import {addActionsColumn, addColumn, TableActions} from '@components/Table';
import {Signature} from '@modules/data/signature';
import Table, {ColumnsType} from 'antd/lib/table';
import {GetRowKey} from 'antd/lib/table/interface';
import React from 'react';

function getTableActions(item: Signature) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}

export const SignatureTable = ({
  getSignature,
  loadingSignature,
}: {
  getSignature: () => Signature[];
  loadingSignature: boolean;
}) => {
  const onSignatureClick = (encoding: string) => console.log('tag click', encoding);

  const columns: ColumnsType<Signature> = [
    addColumn<Signature>({
      title: 'Source',
      dataIndex: 'abi_source',
    }),
    addColumn<Signature>({
      title: 'Encoding',
      dataIndex: 'encoding',
    }),
    addColumn<Signature>({
      title: 'Type',
      dataIndex: 'type',
    }),
    addColumn<Signature>({
      title: 'Name',
      dataIndex: 'name',
    }),
    addColumn<Signature>({
      title: 'Signature',
      dataIndex: 'signature',
    }),
    addActionsColumn<Signature>(
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

  const rowKey: GetRowKey<Signature> = ({signature}, index) => `${signature}${index}`;

  return (
    <Table<Signature>
      rowKey={rowKey}
      columns={columns}
      dataSource={getSignature()}
      loading={loadingSignature}
      size='small'
      scroll={{x: 1300}}
    />
  );
};
