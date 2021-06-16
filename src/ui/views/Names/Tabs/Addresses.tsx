import { NamesFilters } from '@components/Filters';
import { addActionsColumn, addColumn, addFlagColumn, addTagsColumn, BaseTableRows, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { NameType } from '@modules/data/name';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';
import './Addresses.css';

export const Addresses = () => {
  const [addresses, loading] = useCommand('names', { expand: true });
  if (addresses.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch addresses',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  return (
    <>
      <NamesFilters />
      <BaseTableRows data={getData(addresses)} columns={addressSchema} loading={loading} />
    </>
  );
};

const addressSchema: ColumnsType<NameType> = [
  addColumn<NameType>({
    title: 'Address',
    dataIndex: 'address',
  }),
  addColumn({
    title: 'Name',
    dataIndex: 'name',
  }),
  addColumn({
    title: 'Symbol',
    dataIndex: 'symbol',
  }),
  addColumn({
    title: 'Source',
    dataIndex: 'source',
  }),
  addColumn({
    title: 'Decimals',
    dataIndex: 'decimals',
  }),
  addColumn({
    title: 'Description',
    dataIndex: 'description',
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
  addFlagColumn({
    title: 'Prefund',
    dataIndex: 'is_prefund',
  }),
  addFlagColumn({
    title: 'ERC20',
    dataIndex: 'is_erc20',
  }),
  addFlagColumn({
    title: 'ERC721',
    dataIndex: 'is_erc721',
  }),
  addFlagColumn({
    title: 'Contract',
    dataIndex: 'is_contract',
  }),
  addFlagColumn({
    title: 'Monitor',
    dataIndex: 'mon',
  }),
  addActionsColumn<NameType>(
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

function getTableActions(item: NameType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}
