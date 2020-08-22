/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState, Fragment } from 'react';

import { Tablebar, PanelTable } from 'components';
import { calcValue, fmtNum, handleClick } from 'components/utils';

import './GridTable.css';
import { getPrimaryKey } from 'store';

//-----------------------------------------------------------------
export const GridTable = ({
  data,
  columns,
  title = 'Grid Table (gt-)',
  meta = { max: 300000, completed: 220001 },
  rowSpan = 1e6,
}) => {
  const [selected, setSelected] = useState(100000); //localStorage.getItem('grid-select'));
  const largest = meta.max;

  const cols = Array(10)
    .fill()
    .map((_, idx) => idx);

  const rows = Array(Math.ceil(largest / rowSpan))
    .fill()
    .map((_, idx) => idx);

  const selectionChanged = (newSelected) => {
    setSelected(newSelected);
    localStorage.setItem('grid-select', newSelected);
  };

  const idCol = getPrimaryKey(columns);
  if (!idCol) return <div className="warning">The data schema does not contain a primary key</div>;

  return (
    <Fragment>
      <Tablebar title={title} />
      <GridHeader cols={cols} rowSpan={rowSpan} />
      <div className="at-body gt-body">
        {rows.map((row) => {
          return (
            <GridRow
              key={row}
              row={row}
              cols={cols}
              meta={meta}
              rowSpan={rowSpan}
              selected={selected}
              setSelected={selectionChanged}
            />
          );
        })}
      </div>
      <DetailTable data={data} columns={columns} idCol={idCol} cellStart={selected} cellSpan={rowSpan / 10} />{' '}
    </Fragment>
  );
};

//-----------------------------------------------------------------
const GridRow = ({ row, cols, meta, rowSpan, selected, setSelected }) => {
  const colSpan = rowSpan / 10;
  return (
    <div className="at-row gt-row">
      <div className="at-header-base at-sider">{fmtNum(row * rowSpan)}:</div>
      {cols.map((col) => {
        const cellStart = row * rowSpan + col * colSpan;
        const cellEnd = row * rowSpan + (col + 1) * colSpan;
        let cn = 'inactive';
        if (meta.completed >= cellEnd) cn = 'completed';
        else if (meta.completed >= cellStart) cn = 'in-progress';
        if (selected === cellStart) cn += ' selected';
        return (
          <div
            key={col}
            className={'at-cell gt-cell ' + cn}
            onClick={(e) => handleClick(e, setSelected, row * 1e6 + col * 1e5)}
          >
            {cn.includes('completed') && '✔'}
          </div>
        );
      })}
    </div>
  );
};

//-----------------------------------------------------------------
const GridHeader = ({ cols, rowSpan }) => {
  const colSpan = rowSpan / 10;
  return (
    <div className="at-header-base at-header gt-header">
      <div> </div>
      {cols.map((n, idx) => {
        return <div key={n * idx}>{fmtNum(n * colSpan)}</div>;
      })}
    </div>
  );
};

//-----------------------------------------------------------------
export const DetailTable = ({ data, columns, title, idCol, cellStart, cellSpan }) => {
  if (cellStart === undefined) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 50fr 1fr',
          justifyItems: 'space between',
        }}
      >
        <div></div>
        <div
          className="at-body"
          style={{
            borderTop: '0px',
            paddingLeft: '10px',
          }}
        >
          <h4>Click a box to see details</h4>
        </div>
        <div></div>
      </div>
    );
  }

  const range = { start: cellStart, end: cellStart + cellSpan };
  const filteredData = data.filter(
    (item) => (item.firstAppearance >= range.start) & (item.firstAppearance < range.end)
  );
  if (filteredData.length > 200 || cellSpan > 100000) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 50fr 1fr',
          justifyItems: 'space between',
        }}
      >
        <div></div>
        <div
          className="at-body"
          style={{
            borderTop: '0px',
            paddingLeft: '10px',
          }}
        >
          <h4>Click a box to see details</h4>
        </div>
        <div></div>
      </div>
    );
  }

  const subtit =
    'Details: ' +
    (filteredData.length ? filteredData.length : 'No') +
    ' completed chunks in block range ' +
    range.start +
    '-' +
    range.end;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 50fr 1fr',
        justifyItems: 'space between',
      }}
    >
      <div></div>
      <div
        className="at-body"
        style={{
          borderTop: '0px',
          // paddingLeft: '10px',
        }}
      >
        <h4>{subtit}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 92 4fr', justifyItems: 'stretch', gridGap: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyItems: 'stretch',
              gridGap: '4px',
            }}
          >
            {filteredData.map((record) => {
              return (
                <PanelTable
                  style={{ margin: '0px !important', padding: '0px !important' }}
                  key={calcValue(record, idCol)}
                  data={record}
                  columns={columns}
                  title={record.filename}
                />
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
