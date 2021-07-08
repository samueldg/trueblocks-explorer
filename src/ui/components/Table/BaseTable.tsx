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

export type SelectedRow = {
  pageSize: number;
  currentPage: number;
  focusedRow: number;
  dataRow: number;
};

export const BaseTable = ({
  data,
  columns,
  loading,
  extraData,
  expandRender = undefined,
  siderRender = undefined,
}: {
  data: JsonResponse;
  columns: ColumnsType<any>;
  loading: boolean;
  extraData?: string;
  expandRender?: (row: any) => JSX.Element;
  siderRender?: (record: any, selectedRow: SelectedRow) => JSX.Element;
}) => {
  const { debug } = useGlobalState();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.ReactText[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
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
    () => {
      /* nextPage */
      if (currentPage < Math.ceil(dataSource?.length / pageSize)) {
        setCurrentPage(currentPage + 1);
        setFocusedRow(0);
      }
    },
    () => {
      /* prevPage */
      currentPage > 1 && setCurrentPage(currentPage - 1);
      const tr = document.querySelector('tr[data-row-key]');
      const siblings = getSiblings(tr);
      setFocusedRow(siblings.length - 1);
      if (siblings.length > 0) siblings[siblings.length - 1].focus();
    },
    () => {
      /* firstPage */
      setCurrentPage(1);
    },
    () => {
      /* lastPage */
      const lastPage = Math.ceil(dataSource?.length / pageSize);
      setCurrentPage(lastPage);
      setFocusedRow(dataSource?.length - (lastPage - 1) * pageSize - 1);
    },
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
        setFocusedRow(0);
        if (siblings?.length) siblings[0].focus();
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
      setFocusedRow(0);
      if (siblings?.length) {
        siblings[0].focus();
      }
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

  const expandedRowRender =
    expandRender !== undefined ? expandRender : (row: any) => <pre>{JSON.stringify(row, null, 2)}</pre>;
  let sider = <></>;
  let style = { display: 'grid', gridTemplateColumns: '20fr 1fr' };
  if (dataSource && siderRender) {
    let dataRow = pageSize * (currentPage - 1) + focusedRow;
    const record = dataSource[Math.max(0, dataRow)];
    sider = siderRender(record, { pageSize, currentPage, focusedRow, dataRow });
    style = { display: 'grid', gridTemplateColumns: '10fr 4fr' };
  }
  return (
    <>
      <div onFocus={handleOnFocus} onBlur={handleOnBlur} style={style}>
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
            expandedRowRender: expandedRowRender,
          }}
        />
        {sider}
      </div>
      {debug ? <pre>records: {JSON.stringify(data?.length)}</pre> : <></>}
      {debug ? <pre>{JSON.stringify(data, null, 2)}</pre> : <></>}
    </>
  );
};
