/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState } from 'react';

import { Tablebar, Displayable } from 'components';
import { calcValue, formatFieldByType } from 'components/utils'
import { getPrimaryKey } from 'store';

import './ObjectTable.css';

//-----------------------------------------------------------------
export const ObjectTable = ({
  data,
  columns,
  title = '',
  search = false,
  searchFields = [],
  pagination = false,
  paginationParts = '',
  showHidden = false,
  detailLevel = 2,
  handler = null,
  cn = null,
}) => {
  const [filterText] = useState('');

  const idCol = getPrimaryKey(columns);
  if (!idCol) return <div className='warning'>{"The data schema contain no primary key. Can't render."}</div>;
  const id = calcValue(data, idCol);

  const tableBar = (title !== '' || pagination) && (
    <Tablebar
      title={title}
      search={search}
      filterText={filterText}
      searchFields={searchFields}
      pagination={pagination}
      pagingCtx={{ curPage: 0, paginationParts: paginationParts }}
      handler={handler}
    />
  );

  let debug = false;
  return (
    <div className={(cn ? cn : 'ot') + '-container'}>
      {debug && <pre>{JSON.stringify(columns, null, 2)}</pre>}
      {tableBar}
      <div className={'at-body ' + (cn ? cn : 'ot') + '-body'}>
        {columns.map((column, index) => {

          const value = calcValue(data, column);
          const rawValue = data && data[column.selector];

          // hide_empty is not part of the schema. This is here as a note so I don't forget about adding it back in
          // if (column.hide_empty && rawValue === '') return null;

          if (column.detail > detailLevel) return null;
          if (column.type === 'icons') return null;

          const fieldName = column.name || column.selector;
          const fieldType = column.type || 'string';
          const formatted = formatFieldByType(fieldType, value, column.decimals) || '';
          const key = id + '_' + column.selector;

          const siderClass = 'at-header-base at-sider ' + (cn ? cn : 'ot') + '-sider';
          const rowClass = 'at-row ' + (cn ? cn : 'ot') + '-row' + (column.wide ? '-wide nowrap' : '');

          if (column.type === 'separator') {
            const record = {...column, 'detailLevel': detailLevel};
            const value = column.onDisplay ? column.onDisplay(record, column.selector) : column.name;
            return (
              <div key={key} className={rowClass + "-wide"}>
                <div
                  className={siderClass}
                  style={{ backgroundColor: 'lightgrey' }}
                >
                {value}
                </div>
              </div>
            );
          }

          return (
            <div key={key} className={rowClass}>
              {!column.wide && <ObjectTableSider siderClass={siderClass}>{fieldName.replace(/statements./, '') + ':'}</ObjectTableSider>}
              <ObjectTableColumn cn={cn} column={column}>
                <Displayable
                  display={formatted}
                  copyable={column.copyable ? rawValue : null}
                  viewable={column.type === 'address' ? rawValue : null}
                  handler={handler}
                />
              </ObjectTableColumn>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//-----------------------------------------------------------------
const ObjectTableSider = ({ siderClass, children }) => {
  return <div className={siderClass}>{children}</div>;
};

//-----------------------------------------------------------------
const ObjectTableColumn = ({ cn, column, children }) => {
  const { align, editable } = column;
  let ccn = (cn ? cn : 'ot') + '-cell';
  ccn += (editable ? ' editable' : '');
  ccn += (align === 'wordwrap' ? ' ' : ' nowrap');
  if (column.cn) ccn += ' ' + column.cn;
  return (
    <div style={{ overflow: 'none' }} className={ccn} align="left">
      {children}
    </div>
  );
};
