import {
  Button,
  PageHeader,
  Table,
  Tag,
} from 'antd';
import React, { useCallback } from 'react';
import { NamesFilters } from '@components/Filters';
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useCommand } from '../hooks/useCommand';

import './Names.css';
import { ColumnsType } from 'antd/lib/table';

type ColumnListItem = [string, string, string?];

type Name = {
  /* eslint-disable camelcase */
  address: string,
  decimals: number,
  deleted: boolean,
  description: string,
  is_contract: boolean,
  is_custom: boolean,
  is_erc20: boolean,
  is_erc721: boolean,
  is_prefund: boolean,
  name: string,
  source: string,
  symbol: string,
  tags: string,
};

function generateColumns(columnsList: ColumnListItem[]): ColumnsType<Name> {
  const taggedFlag = {
    render(flag: boolean) {
      return (
        <Tag color={flag ? 'green' : 'volcano'}>
          {flag ? 'Yes' : 'No'}
        </Tag>
      );
    },
  };
  const tags = {
    render(rawTag: string) {
      if (!rawTag) return (<></>);
      const splittedTags = rawTag.split(':');

      return splittedTags.map((tag) => (
        <Tag onClick={() => alert('Filter by ' + rawTag)} key={tag}>
          {tag}
        </Tag>
      ));
    },
  };
  const actions = {
    fixed: 'right',
    width: 150,
    render(text: string, record: Name) {
      const createOnClick = (action: string) => () => console.log(action, { text, record });

      return (
        <>
          <Button
            shape="circle"
            type="text"
            onClick={createOnClick('details')}
          >
            <InfoCircleOutlined />
          </Button>
          <Button
            danger
            shape="circle"
            type="text"
            onClick={createOnClick('remove')}
          >
            <DeleteOutlined />
          </Button>
          <Button
            shape="circle"
            type="text"
            onClick={createOnClick('edit')}
          >
            <EditOutlined />
          </Button>
          <Button
            shape="circle"
            type="text"
            onClick={createOnClick('addMonitor')}
          >
            <PlusCircleOutlined />
          </Button>
        </>
      );
    },
  };

  return columnsList.map(([title, dataIndex, key = dataIndex]) => ({
    title,
    dataIndex,
    key,
    ellipsis: true,
    className: dataIndex === 'tags' ? 'tags' : '',
    ...(/pre|erc|con|mon/.test(dataIndex) ? taggedFlag : {}),
    ...(dataIndex === 'tags' ? tags : {}),
    ...(dataIndex === 'actions' ? actions : {}),
  })) as ColumnsType<Name>;
}

export const NamesView = () => {
  const columns = generateColumns([
    ['ID', 'address'],
    ['Tags', 'tags'],
    ['Address', 'address'],
    ['Name', 'name'],
    ['Symbol', 'symbol'],
    ['Source', 'source'],
    ['Decimals', 'decimals'],
    ['Description', 'description'],
    ['Prefund', 'is_prefund'],
    ['ERC20', 'is_erc20'],
    ['ERC721', 'is_erc721'],
    ['Contract', 'is_contract'],
    ['mon', 'mon'],
    ['', 'actions'],
  ]);

  const [names, loadingNames] = useCommand('names', { expand: true });
  const getNames = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  // TODO: replace with something that makes sense
  const rowKey = () => Math.floor(Math.random() * (1000 - 1) + 1);

  return (
    <>
      <PageHeader
        title="Names"
      />
      <NamesFilters />

      <Table<Name>
        rowKey={rowKey}
        columns={columns}
        dataSource={getNames(names)}
        loading={loadingNames}
        size="small"
        scroll={{ x: 1300 }}
      />
    </>
  );
};
