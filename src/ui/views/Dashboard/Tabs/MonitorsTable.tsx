import { addActionsColumn, addColumn, addFlagColumn, addTagsColumn, TableActions } from '@components/Table';
import { MonitorType } from '@modules/data/monitor';
import Table, { ColumnsType } from 'antd/lib/table';
import { GetRowKey } from 'antd/lib/table/interface';
import React from 'react';

function getTableActions(item: MonitorType) {
  return <TableActions item={item} onClick={(action, tableItem) => console.log('Clicked action', action, tableItem)} />;
}

export const MonitorsTable = ({
  getMonitors,
  loadingMonitors,
}: {
  getMonitors: () => MonitorType[];
  loadingMonitors: boolean;
}) => {
  const onTagClick = (tag: string) => console.log('tag click', tag);

  const columns: ColumnsType<MonitorType> = [
    addColumn<MonitorType>({
      title: 'Address',
      dataIndex: 'address',
    }),
    addColumn({
      title: 'Monitor',
      dataIndex: 'monitor',
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
      onTagClick
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
    addActionsColumn<MonitorType>(
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

  const rowKey: GetRowKey<MonitorType> = ({ address }, index) => `${address}${index}`;

  return (
    <Table<MonitorType>
      rowKey={rowKey}
      columns={columns}
      dataSource={getMonitors()}
      loading={loadingMonitors}
      size='small'
      scroll={{ x: 1300 }}
    />
  );
};
