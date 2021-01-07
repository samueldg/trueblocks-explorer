/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState } from 'react';

import { DataTable, ObjectTable } from 'components';
import {  calcValue, stateFromStorage } from 'components/utils';
import { getPrimaryKey } from 'store';
import { getIcon } from 'pages/utils';

import './SidebarTable.css';
import { handleClick } from 'components/utils';

export const SidebarTable = ({
  tableName,
  data,
  columns,
  title,
  search=true,
  searchFields,
  pagination=true,
  recordIcons,
  parentHandler,
  detailLevel=2,
}) => {
  const [selectedRow, setSelectedRow] = useState({});

  const idCol = getPrimaryKey(columns);
  if (!idCol) return <div className="warning">The data schema does not contain a primary key</div>;

  const sidebarHandler = (action) => {
    const record_id = action.record_id;
    let record = data.filter((record) => {
      return record_id && calcValue(record, idCol) === record_id;
    });
    if (record) record = record[0];
    switch (action.type) {
      case 'row-changed':
        if (record) setSelectedRow(record);
        if (parentHandler) parentHandler(action);
        return;
      case 'interact':
        alert('Interact with the contract ' + JSON.stringify(action.payload));
        break;
      default:
        if (parentHandler) parentHandler(action);
        break;
    }
  };

  let imageUrl = 'http://localhost:3002/assets/icons/' + selectedRow.to + '.png';
  const detailIcon = getIcon('x', (detailLevel === 0 ? 'toggleleft' : (detailLevel === 1 ? 'togglecenter' : 'toggleright')), true, true, 24);
  return (
    <div className="sidebar-table">
      <div className="st-left">
        <DataTable
          tableName={tableName}
          data={data}
          columns={columns}
          title={title}
          search={search}
          searchFields={searchFields}
          pagination={pagination}
          paginationParts=""
          recordIcons={recordIcons}
          showHidden={Number(stateFromStorage('showHidden', false))}
          detailLevel={detailLevel}
          parentHandler={sidebarHandler}
        />
      </div>
      <div></div>
      <div className="st-right">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr 1fr', alignItems: 'end' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{height: '30px', width: '200px', overflow: 'hidden'}} onClick={(e) => handleClick(e, sidebarHandler, { type: 'interact', payload: selectedRow['toName'] })}>
              <img height="30px" title={''} alt={''} src={imageUrl} />
            </div>
          </div>
          <div className="at-title" style={{ textAlign: 'center' }}>
            Details
          </div>
          <div
            style={{ textAlign: 'right', paddingRight: '8px', alignItems: 'end' }}
            onClick={(e) => handleClick(e, parentHandler, { type: 'toggle-detail' })}
          >
            <div>{detailIcon}</div>
          </div>
        </div>
        <ObjectTable
          tableName={tableName}
          cn="st"
          data={selectedRow}
          columns={columns}
          showHidden={Number(stateFromStorage('showHidden', false))}
          detailLevel={detailLevel}
        />
      </div>
    </div>
  );
};
