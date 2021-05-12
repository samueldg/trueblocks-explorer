import {
  Button,
  PageHeader,
  Table,
  Tag,
} from 'antd';
import React, { useCallback } from 'react';
import { NamesFilters } from '@components/Filters';
import { useCommand } from '../hooks/useCommand';

import './Names.css';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

type ColumnListItem = [string, string, string?];

function generateColumns(columnsList: ColumnListItem[]) {
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
    render() {
      return (
        <>
          <Button shape="circle"><InfoCircleOutlined /></Button>
          <Button danger><DeleteOutlined /></Button>
          <Button><EditOutlined /></Button>
          <Button><PlusCircleOutlined /></Button>
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
  }));
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

      <Table
        rowKey={rowKey}
        columns={columns}
        dataSource={getNames(names)}
        loading={loadingNames}
        size="small"
      />
    </>
  );
};
