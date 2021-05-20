import React from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';

import { Name } from '@modules/data/name';
import {
  addColumn,
  addFlagColumn,
  addTagsColumn,
  addActionsColumn,
  TableActions,
} from '@components/Table';

function getTableActions(item: Name) {
  return (
    <TableActions
      item={item}
      onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)}
    />
  );
}

export const NamesTable = ({
  getNames,
  loadingNames,
}: {
  getNames: () => Name[],
  loadingNames: boolean,
}) => {
  const onTagClick = (tag: string) => console.log('tag click', tag);

  const columns: ColumnsType<Name> = [
    addColumn<Name>({
      title: 'ID',
      dataIndex: 'address',
    }),
    addTagsColumn({
      title: 'Tags',
      dataIndex: 'tags',
      configuration: {
        ellipsis: false,
      },
    }, onTagClick),
    addColumn({
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
    addActionsColumn<Name>({
      title: '',
      dataIndex: '',
    }, {
      width: 150,
      getComponent: getTableActions,
    }),
  ];

  const rowKey: GetRowKey<Name> = ({ address }, index) => `${address}${index}`;

  return (
    <Table<Name>
      rowKey={rowKey}
      columns={columns}
      dataSource={getNames()}
      loading={loadingNames}
      size="small"
      scroll={{ x: 1300 }}
    />
  );
};
