import { JsonResponse } from '@modules/core';
import Table, { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useGlobalState from '../../state';
import { getSiblings, useKeyBindings } from '../../utils';

export const CustomRow = (props: any) => {
  if (props.className.indexOf('ant-table-expanded-row') >= 0) return <tr {...props} />;
  else return <tr {...props} tabIndex={0} />;
};

export const BaseTable = ({
  data,
  columns,
  loading,
  extraData,
  expandRender,
}: {
  data: JsonResponse;
  columns: ColumnsType<any>;
  loading: boolean;
  extraData?: string;
  expandRender?: (record: any) => JSX.Element;
}) => {
  const { debug } = useGlobalState();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.ReactText[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [focusedRow, setFocusedRow] = useState(0);

  const dataSource = data?.map((item: any, i: number) => {
    return {
      id: (i + 1).toString(),
      extraData: extraData,
      ...item,
    };
  });

  const { handleOnFocus, handleOnBlur } = useKeyBindings(
    expandedRowKeys,
    setExpandedRowKeys,
    currentPage,
    pageSize,
    dataSource?.length,
    () => currentPage < Math.ceil(dataSource?.length / pageSize) && setCurrentPage(currentPage + 1),
    () => {
      currentPage > 1 && setCurrentPage(currentPage - 1);
      const tr = document.querySelector('tr[data-row-key]');
      const siblings = getSiblings(tr);
      siblings[siblings.length - 1].focus();
    },
    () => setCurrentPage(1),
    () => setCurrentPage(Math.ceil(dataSource?.length / pageSize)),
    focusedRow,
    (row) => setFocusedRow(row)
  );

  useHotkeys(
    'left,pageup',
    () => {
      currentPage > 1 && setCurrentPage(currentPage - 1);
      const tr = document.querySelector('tr[data-row-key]');
      const siblings = getSiblings(tr);
      if (currentPage === 1) {
        //@ts-ignore
        tr.focus();
      } else {
        siblings[focusedRow].focus();
      }
    },
    [currentPage, dataSource, focusedRow, setFocusedRow]
  );
  useHotkeys(
    'right,pagedown',
    () => {
      currentPage < Math.ceil(dataSource?.length / pageSize) && setCurrentPage(currentPage + 1);
      const tr = document.querySelector('tr[data-row-key]');
      const siblings = getSiblings(tr);
      if (siblings[focusedRow]) siblings[focusedRow].focus();
    },
    [currentPage, dataSource, focusedRow, setFocusedRow]
  );

  const components = {
    body: { row: CustomRow },
  };

  useEffect(() => {
    const tr = document.querySelector('tr[data-row-key]');
    if (tr) {
      //@ts-ignore
      tr.focus();
    }
    const siblings = getSiblings(tr);
    if (
      siblings &&
      siblings.length > 0 &&
      currentPage === Math.ceil(dataSource?.length / pageSize) &&
      tr?.getAttribute('data-row-key')?.toString() !== siblings.length.toString()
    ) {
      siblings[siblings.length - 1].focus();
    }
  }, [currentPage]);

  const expandRenderer = expandRender ? expandRender : (rowset: any) => <pre>{JSON.stringify(rowset, null, 2)}</pre>;

  return (
    <div onFocus={handleOnFocus} onBlur={handleOnBlur}>
      <Table<any>
        rowKey={'id'}
        components={components}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          pageSize: pageSize,
          onChange: (page, newPageSize) => {
            setCurrentPage(page);
            if (newPageSize !== pageSize) {
              setPageSize(pageSize);
              setCurrentPage(1);
              const tr = document.querySelector('tr[data-row-key]');
              //@ts-ignore
              tr.focus();
            }
          },
        }}
        rowClassName={(record, index) => 'row-' + index}
        size='small'
        scroll={{ x: 1300 }}
        expandable={{
          onExpandedRowsChange: (expandedRowKeys) => {
            setExpandedRowKeys(expandedRowKeys);
          },
          expandedRowKeys: expandedRowKeys,
          expandedRowRender: expandRenderer,
        }}
      />
      {debug ? <pre>records: {JSON.stringify(data?.length)}</pre> : <></>}
      {debug ? <pre>{JSON.stringify(data, null, 2)}</pre> : <></>}
    </div>
  );
};
