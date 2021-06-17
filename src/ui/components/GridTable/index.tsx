/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState } from 'react';

//import { Tablebar, PanelTable } from 'components';
//import { calcValue, fmtNum, handleClick } from 'components/utils';

//import './GridTable.css';
//import { getPrimaryKey } from 'store';

//-----------------------------------------------------------------
export const GridTable = ({
  data,
  columns,
  title = 'Grid Table (gt-)',
  meta = { max: 12500000, completed: 12300000 },
  rowSpan = 1e6,
}: {
  data: any,
  columns: any,
  title?: string,
  meta?: any,
  rowSpan?: any
}) => {
  const [selected, setSelected] = useState(100000); //localStorage.getItem('grid-select'));
  const largest = meta.max;

  const cols = Array(10)
    .fill('')
    .map((_, idx) => idx);

  const rows = Array(Math.ceil(largest / rowSpan))
    .fill(10)
    .map((_, idx) => idx);

  const selectionChanged = (newSelected: any) => {
    setSelected(newSelected);
    localStorage.setItem('grid-select', newSelected);
  };

  const idCol = 'firstTs'; //getPrimaryKey(columns);
  if (!idCol) return <div className="warning">The data schema does not contain a primary key</div>;

  return (
    <Fragment>
      {/*<Tablebar title={title} />*/}
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
      {
      /*
      <DetailTable data={data} columns={columns} idCol={idCol} cellStart={selected} cellSpan={rowSpan / 10} />
      */
      }
    </Fragment>
  );
};

//-----------------------------------------------------------------
const GridRow = ({ row, cols, meta, rowSpan, selected, setSelected } :
  {row: any, cols: any, meta: any, rowSpan: any, selected: any, setSelected: any}
) => {
  const colSpan: number = rowSpan / 10;
  const rowStyle = {
    // borderBottom: '1px lightgrey solid',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    textAlign: 'center' as 'center'
  }
  const siderStyle = {
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'Times',
    color: 'black',
    backgroundColor: 'white',
    borderRight: '1px solid lightgrey',
  }
  let cellStyle = {
    fontFamily: 'Times',
    padding: 2,
    paddingRight: 6,
    paddingLeft: 6,
    overflow: 'hidden',
    whiteSpace: 'nowrap' as 'nowrap',
    textOverflow: 'ellipsis',
    borderTop: '1px solid lightgrey',
    borderRight: '1px solid lightgrey',
    display: 'block',
    backgroundColor: 'white',
  };
  return (
    <div style={rowStyle}>
      <div style={siderStyle}>{row * rowSpan}:</div>
      {cols.map((col: {col: any}) => {
        const x: any = col;
        const cellStart = row * rowSpan + (x * colSpan);
        const cellEnd = row * rowSpan + (x + 1) * colSpan;
        let stat = false;
        cellStyle = { ...cellStyle, backgroundColor: 'lightgrey' };
        if (meta.completed >= cellEnd) {
          cellStyle = { ...cellStyle, backgroundColor: 'white' };
          stat = true;
        }
        // else if (meta.completed >= cellStart) cn = {
        //   background: repeating-linear-gradient(
        //     -45deg,
        //     var(--lightgrey-color),
        //     var(--lightgrey-color) 5px,
        //     var(--white-color) 5px,
        //     var(--white-color) 10px
        //   );
        //   background-repeat: repeat;
        //   border-radius: 0px 0px var(--at-radius) var(--at-radius);
        // };
        // if (selected === cellStart) cn += ' selected';
        return (
          <div
            key={x}
            style={cellStyle}
            // className={'at-cell gt-cell ' + cn}
          >
            {stat && '✔'}
          </div>
        );
      })}
    </div>
  );
};

//-----------------------------------------------------------------
const GridHeader = ({ cols, rowSpan }: { cols: any, rowSpan: any}) => {
  const colSpan = rowSpan / 10;
  const style = {
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'Times',
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center' as 'center',
    padding: 2,
    border: 1,
    borderBottomWidth: '0px',
    borderRadius: '0px 0px 0px 0px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
    justifyItems: 'stretch'
  };
  return (
    <div style={style}>
      <div> </div>
      {cols.map((n: number, idx: number) => {
        return <div key={n * idx}>{Intl.NumberFormat().format(n * colSpan)}</div>;
      })}
    </div>
  );
};

// //-----------------------------------------------------------------
// export const DetailTable = ({ data, columns, title, idCol, cellStart, cellSpan }) => {
//   if (cellStart === undefined) {
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 50fr 1fr',
//           justifyItems: 'space between',
//         }}
//       >
//         <div></div>
//         <div
//           className="at-body"
//           style={{
//             borderTop: '0px',
//             paddingLeft: '10px',
//           }}
//         >
//           <h4>Click a box to see details</h4>
//         </div>
//         <div></div>
//       </div>
//     );
//   }

//   const range = { start: cellStart, end: cellStart + cellSpan };
//   const filteredData = data.filter(
//     (item) => (item.firstAppearance >= range.start) & (item.firstAppearance < range.end)
//   );
//   if (filteredData.length > 200 || cellSpan > 100000) {
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 50fr 1fr',
//           justifyItems: 'space between',
//         }}
//       >
//         <div></div>
//         <div
//           className="at-body"
//           style={{
//             borderTop: '0px',
//             paddingLeft: '10px',
//           }}
//         >
//           <h4>Click a box to see details</h4>
//         </div>
//         <div></div>
//       </div>
//     );
//   }

//   const subtit =
//     'Details: ' +
//     (filteredData.length ? filteredData.length : 'No') +
//     ' completed chunks in block range ' +
//     range.start +
//     '-' +
//     range.end;

//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '1fr 50fr 1fr',
//         justifyItems: 'space between',
//       }}
//     >
//       <div></div>
//       <div
//         className="at-body"
//         style={{
//           borderTop: '0px',
//           // paddingLeft: '10px',
//         }}
//       >
//         <h4>{subtit}</h4>
//         <div style={{ display: 'grid', gridTemplateColumns: '4fr 92 4fr', justifyItems: 'stretch', gridGap: '20px' }}>
//           <div
//             style={{
//               display: 'flex',
//               flexFlow: 'row wrap',
//               justifyItems: 'stretch',
//               gridGap: '4px',
//             }}
//           >
//             {filteredData.map((record) => {
//               return (
//                 <PanelTable
//                   style={{ margin: '0px !important', padding: '0px !important' }}
//                   key={calcValue(record, idCol)}
//                   data={record}
//                   columns={columns}
//                   title={record.filename}
//                 />
//               );
//             })}
//           </div>
//           <div></div>
//         </div>
//       </div>
//       <div></div>
//     </div>
//   );
// };
