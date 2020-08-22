/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState, useEffect } from 'react';
import { search as theSearch } from 'ss-search';

import { Tablebar, IconTray, Displayable } from 'components';
import { calcValue, exportValue, formatFieldByType, downloadData, createClass } from 'components/utils';
import { getPrimaryKey, getAltIconKey } from 'store';
import { stateFromStorage, handleClick, sortArray } from 'components/utils';
import { hasFields } from './utils';

import ChevronUp from 'assets/icons/ChevronUp';
import ChevronDown from 'assets/icons/ChevronDown';

import './DataTable.css';

//-------------------------------------------------------------------------
export const DataTable = ({
  data,
  columns,
  title = 'Data Table (dt-)',
  tableName = '',
  search = false,
  searchFields = [],
  pagination = false,
  paginationParts = '',
  showHidden = false,
  detailLevel = 2,
  recordIcons = [],
  parentHandler = null,
}) => {
  const defPaging = {
    curPage: 0,
    curIndex: -1,
    nRecords: 0,
    perPage: 10,
    paginationParts: paginationParts,
  };
  const [pagingCtx, setPaging] = useState({ ...defPaging, perPage: stateFromStorage('perPage', 15) });
  const [filterText, setFilterText] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const [sortCtx1, setSortCtx1] = useState(stateFromStorage(tableName + '_sort1', { sortBy: '', sortDir: 'asc' }));
  const [sortCtx2, setSortCtx2] = useState(stateFromStorage(tableName + '_sort2', { sortBy: '', sortDir: 'asc' }));

  function changeRow(rowId) {
    if (parentHandler) parentHandler({ type: 'row-changed', record_id: rowId });
  }

  const goToRecord = (n) => {
    n = Math.min(filteredData.length - 1, Math.max(0, n));
    const page = Math.floor(n / pagingCtx.perPage);
    setPaging({ ...pagingCtx, curPage: page, curIndex: n, nRecords: filteredData ? filteredData.length : 0 });
    changeRow(calcValue(filteredData[n], idCol));
  };

  const dataTableHandler = (action) => {
    switch (action.type) {
      case 'update_filter':
        setFilterText(action.payload);
        break;

      case 'clear_filter':
        setFilterText('');
        break;

      case 'sortBy':
        let newSort1 = sortCtx1;
        let newSort2 = sortCtx2;
        if (sortCtx1.sortBy === action.fieldName) {
          if (sortCtx1.sortDir === 'asc') {
            newSort1.sortDir = 'desc';
          } else if (sortCtx1.sortDir === 'desc') {
            newSort1 = sortCtx2;
            newSort2 = { sortBy: '', sortDir: 'asc' };
          } else {
            newSort1.sortDir = 'asc';
          }
        } else {
          newSort1 = { sortBy: action.fieldName, sortDir: 'asc' };
          newSort2 = sortCtx1;
        }
        setSortCtx1(newSort1);
        setSortCtx2(newSort2);
        localStorage.setItem(tableName + '_sort1', JSON.stringify(newSort1));
        localStorage.setItem(tableName + '_sort2', JSON.stringify(newSort2));
        goToRecord(0);
        break;

      case 'perPage':
        const newCtx = {
          ...pagingCtx,
          curPage: 0,
          perPage: Number(action.payload),
        };
        goToRecord(0);
        setPaging(newCtx);
        localStorage.setItem('perPage', JSON.stringify(action.payload));
        break;

      case 'home':
        goToRecord(0);
        break;

      case 'end':
        goToRecord(filteredData.length - 1);
        break;

      case 'pagedown':
      case 'right':
        goToRecord(pagingCtx.curIndex + Number(pagingCtx.perPage));
        break;

      case 'pageup':
      case 'left':
        goToRecord(pagingCtx.curIndex - Number(pagingCtx.perPage));
        break;

      case 'down':
        goToRecord(pagingCtx.curIndex + 1);
        break;

      case 'up':
        goToRecord(pagingCtx.curIndex - 1);
        break;

      case 'row_click':
        {
          let idx = -1;
          filteredData.map((item, index) => {
            if (calcValue(item, idCol) === action.record_id) {
              idx = index;
            }
            return true;
          });
          if (idx >= 0) goToRecord(idx);
        }
        break;

      case 'row_doubleclick':
        if (parentHandler) parentHandler({ type: 'row_doubleclick', record_id: action.record_id });
        break;

      case 'download':
        if (action.fmt === 'CSV' || action.fmt === 'TXT') {
          const exportFields = columns.filter((column) => {
            return column.download;
          });
          downloadData(action.fmt, exportFields, filteredData, 'download', exportValue);
        } else if (parentHandler) {
          const exportAction = { ...action, columns: columns, data: filteredData };
          parentHandler(exportAction);
        }
        break;

      case 'copied':
      case 'not-copied':
        break;

      default:
        if (parentHandler) {
          if (action.record_id) {
            parentHandler(action);
          } else if (pagingCtx.curIndex !== -1) {
            action = { ...action, record_id: calcValue(filteredData[pagingCtx.curIndex], idCol) };
            parentHandler(action);
          }
        }
        break;
    }
  };

  let filteredData =
    sortCtx1.sortDir !== ''
      ? sortArray(data, [sortCtx1.sortBy, sortCtx2.sortBy], [sortCtx1.sortDir === 'asc', sortCtx2.sortDir === 'asc'])
      : data;

  if (filterText !== '' && hasFields(columns, searchFields)) {
    filteredData = theSearch(data, searchFields, filterText);
  }

  const firstInPage = Number(pagingCtx.perPage) * Number(pagingCtx.curPage);
  const lastInPage = Math.min(Number(firstInPage) + Number(pagingCtx.perPage), filteredData ? filteredData.length : 0);

  useEffect(() => {
    setPaging({
      ...pagingCtx,
      curPage: 0,
      nRecords: Number(filteredData ? filteredData.length : 0),
      paginationParts: paginationParts,
    });
    if (firstLoad) {
      goToRecord(0);
      setFirstLoad(false);
    } else {
      goToRecord(pagingCtx.curIndex);
    }
  }, [data, filterText]);

  const idCol = getPrimaryKey(columns);
  if (!idCol) return <div className="warning">The data schema does not contain a primary key</div>;

  const altIconCol = getAltIconKey(columns);

  const showTools = title !== '' || search || pagination;
  const headerIcons = recordIcons.filter((icon) => icon.includes('header-'));
  const footerIcons = recordIcons.filter((icon) => icon.includes('footer-'));
  const rowIcons = recordIcons.filter((icon) => !icon.includes('header-') && !icon.includes('footer-'));
  const maxIcons = Math.max(headerIcons.length, rowIcons.length);
  const widArray = widthsFromColumns(columns, showHidden);
  if (maxIcons) widArray.push(' minmax(' + maxIcons * 25 + 'px, 1fr)');
  let widStr = widArray.map((a) => a + ' ').join(' ');
  widStr = widStr.replace(',', '').replace('  ', ' ').replace('px', 'px, ');

  const str = 'grid-template-columns: ' + widStr + '; display: grid;';
  createClass('#whatever-' + tableName, str);
  createClass('#whatever-row-' + tableName, str);

  const debug = false;
  return (
    <Fragment key="dt">
      {debug && <pre>{JSON.stringify(widArray + '|' + str)}</pre>}
      {showTools && (
        <Tablebar
          title={title}
          handler={dataTableHandler}
          search={search}
          filterText={filterText}
          searchFields={searchFields}
          pagination={pagination}
          pagingCtx={{ ...pagingCtx }}
        />
      )}
      <DataTableHeader
        columns={columns}
        showHidden={showHidden}
        sortCtx1={sortCtx1}
        sortCtx2={sortCtx2}
        handler={dataTableHandler}
        headerIcons={headerIcons}
        tableName={tableName}
      />
      <DataTableRows
        data={filteredData}
        columns={columns}
        idCol={idCol}
        altIconCol={altIconCol}
        handler={dataTableHandler}
        firstInPage={firstInPage}
        lastInPage={lastInPage}
        rowIcons={rowIcons}
        showHidden={showHidden}
        tableName={tableName}
        curIndex={pagingCtx.curIndex}
        detailLevel={detailLevel}
      />
      {search && filteredData && filteredData.length ? (
        <Tablebar
          search={search}
          searchFields={searchFields}
          asHeader={false}
          handler={dataTableHandler}
          footerIcons={footerIcons}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
};

//-------------------------------------------------------------------------
const DataTableHeader = ({
  columns,
  showHidden = false,
  sortCtx1 = { sortBy: '', sortDir: '' },
  sortCtx2 = { sortBy: '', sortDir: '' },
  handler,
  headerIcons = null,
  tableName,
}) => {
  const sortIcon1 = <SortIcon dir={sortCtx1.sortDir} n={1} />;
  const sortIcon2 = <SortIcon dir={sortCtx2.sortDir} n={2} />;
  return (
    <div id={'whatever-' + tableName} className="at-header-base at-header dt-header" key="dt-header">
      {columns.map((column, index) => {
        const cellText = (
          <div style={{ display: 'inline' }}>
            {column.name || column.selector}
            {column.selector === sortCtx1.sortBy && sortIcon1}
            {column.selector === sortCtx2.sortBy && sortIcon2}
          </div>
        );
        const hidden = !column.width && !showHidden;
        return hidden || column.selector === 'icons' ? null : (
          <div
            key={'head_' + index}
            onClick={(e) => handleClick(e, handler, { type: 'sortBy', fieldName: column.selector })}
            className="dt-header-cell"
          >
            <div>{cellText}</div>
          </div>
        );
      })}
      <IconTray iconList={headerIcons} handler={handler} record_id={null} />
    </div>
  );
};

//-------------------------------------------------------------------------
const DataTableRows = ({
  data,
  columns,
  handler,
  idCol,
  altIconCol,
  firstInPage,
  lastInPage,
  rowIcons,
  showHidden,
  tableName,
  curIndex,
  detailLevel,
}) => {
  if (!data) return <div>Loading...</div>;
  if (data.length === 0) return <div>No Results</div>;
  const debug = false;
  return (
    <Fragment>
      {debug && <pre>{JSON.stringify(altIconCol, null, 2)}</pre>}
      {data.map((record, recordIndex) => {
        // ...for each row
        const id = calcValue(record, idCol);
        const key = id + '_' + recordIndex;
        const rowKey = key + '_r';
        if (recordIndex < firstInPage || recordIndex >= lastInPage) return null;
        const deleted = record.deleted;
        let monitored = false;
        return (
          <Fragment key={'f_' + rowKey}>
            {/*<pre>{JSON.stringify(altIconCol, null, 2)}</pre>*/}
            {/*<pre>{monitored ? 'true' : 'false'}</pre>*/}
            <div
              className={
                'at-row dt-row' + (curIndex === recordIndex ? ' selected' : '') + (deleted ? ' at-deleted' : '')
              }
              id={'whatever-row-' + tableName}
              onClick={(e) => handleClick(e, handler, { type: 'row_click', record_id: id })}
              onDoubleClick={(e) => handleClick(e, handler, { type: 'row_doubleclick', record_id: id })}
              key={rowKey}
            >
              {columns.map((column, colIndex) => {
                // ...for each column
                const colKey = rowKey + '_' + colIndex;
                let type = column.type ? column.type : 'string';

                let rawValue = record[column.selector];
                const hidden = !column.width && !showHidden;
                if (hidden || (column.type === 'icons' && rowIcons.length > 0)) {
                  return null;
                }

                let value = calcValue(record, column);
                value = formatFieldByType(type, value, column.decimals);
                let found = {};
                let underField = null;
                if (detailLevel > 1 && column.underField && column.underField !== '') {
                  underField = column.underField; // don't remove
                  found = columns.filter((col) => {
                    return col.selector === underField;
                  });
                  if (found.length > 0) underField = <div className="underField">{calcValue(record, found[0])}</div>;
                }
                if (!value || value === undefined) value = type === 'spacer' ? '' : column.isPill ? '' : '-';
                let cn = 'at-cell dt-cell ';
                if (column.cn) cn += column.cn + ' ';
                switch (type) {
                  case 'calc':
                  case 'uint32':
                  case 'uint64':
                  case 'blknum':
                  case 'double':
                  case 'timestamp':
                  case 'filesize':
                  case 'gas':
                  case 'wei':
                  case 'ether':
                  case 'value':
                    cn += ' right ';
                    break;
                  case 'bool':
                    cn += ' center ';
                    break;
                  case 'function':
                  case 'hash':
                  case 'address':
                  case 'bytes32':
                  case 'string':
                  default:
                    break;
                }
                if (column.isPill && value !== '') {
                  cn += ' at-pill center ';
                  cn += type === 'bool' ? (calcValue(record, column) ? 'true' : 'false') : calcValue(record, column);
                }
                if (column.align) cn += ' ' + (column.align && column.align);
                if (column.selector === 'monitored') {
                  monitored = calcValue(record, column);
                }
                return (
                  <div key={colKey} className={cn}>
                    {debug && <pre>{JSON.stringify(found, null, 2)}</pre>}
                    {column.isPill && !handler && (
                      <div className="warning">pill column '{column.selector}' does not have a handler</div>
                    )}
                    <Displayable
                      display={value}
                      copyable={
                        column.type && (column.type === 'address' || column.type.includes('hash')) ? rawValue : null
                      }
                      viewable={column.type && column.type === 'address' ? rawValue : null}
                      handler={handler}
                    />
                    {underField && <div>{underField}</div>}
                  </div>
                );
              })}
              <div style={{ display: 'inline' }}>
                <IconTray
                  iconList={rowIcons}
                  handler={handler}
                  record_id={id}
                  alt={{ deleted: deleted, monitored: monitored }}
                />
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

//-----------------------------------------------------------------
export function widthsFromColumns(columns, showHidden) {
  let totalWidth = columns.reduce((sum, column) => {
    if ((!column.width && !showHidden) || column.type === 'icons') return sum;
    return sum + Number(column.width);
  }, 0);

  // console.log('totalWidth: ', totalWidth);
  const ret = columns
    .map((column) => {
      if ((!column.width && !showHidden) || column.type === 'icons') return null;
      const width = column.width;
      if (column.isPill) return 'minmax(80px, ' + (Math.floor((width / totalWidth) * 64) + 'fr) ');
      /* this value (80px) appears in the css for .at-pill - search it */
      return Math.floor((width / totalWidth) * 64) + 'fr ';
    })
    .filter((x) => x !== null);

  return ret;
}

//-------------------------------------------------------------------------
export const SortIcon = ({ dir, n = -1 }) => {
  if (dir === '') return <></>;
  return (
    <div style={{ display: 'inline' }}>
      {dir === 'asc' ? <ChevronDown size="13px" /> : dir === 'desc' ? <ChevronUp size="13px" /> : <></>}
      {n !== -1 ? (
        <small>
          <small>{n}</small>
        </small>
      ) : null}
    </div>
  );
};
