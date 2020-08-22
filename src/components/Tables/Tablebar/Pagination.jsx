/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState } from 'react';

import 'components/Tables/DataTable/DataTable.css';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'assets/icons/SetChevrons.jsx';
import { ChevronsUp, ChevronUp, ChevronDown, ChevronsDown } from 'assets/icons/SetChevrons.jsx';

import './Pagination.css';
import { handleClick, useArrowKeys } from 'components/utils';

//-----------------------------------------------------------------
export const Pagination = ({ enabled = false, handler = null, pagingCtx = { curPage: 0, paginationParts: '' } }) => {
  useArrowKeys(handler, [handler, pagingCtx]);
  if (!enabled || pagingCtx.nRecords === 0) return <div></div>; // we need this div so spacing of title works right
  if (!handler) return <div className="warning">Pagination is enabled, but no handler given</div>;

  const parts = pagingCtx.paginationParts;
  return (
    <div className="pagination-container">
      {parts !== 'arrows-only' && pagingCtx.nRecords > pagingCtx.perPage && <Selector handler={handler} pagingCtx={pagingCtx} />}
      {parts !== 'arrows-only' && <Display pagingCtx={pagingCtx} />}
      {
        <Fragment>
          <PagingIcon name="home" handler={handler} pagingCtx={pagingCtx} />
          <PagingIcon name="left" handler={handler} pagingCtx={pagingCtx} />
          <PagingIcon name="right" handler={handler} pagingCtx={pagingCtx} />
          <PagingIcon name="end" handler={handler} pagingCtx={pagingCtx} />
        </Fragment>
      }
    </div>
  );
};

//-----------------------------------------------------------------
const Display = ({ pagingCtx }) => {
  const { curPage, nRecords, perPage } = pagingCtx;
  const firstInPage = Math.min(perPage * curPage + 1, pagingCtx.nRecords);
  const lastInPage = Math.min(perPage * (curPage + 1), pagingCtx.nRecords);

  return (
    <Fragment>
      {firstInPage}-{lastInPage} of {nRecords}
    </Fragment>
  );
};

//-----------------------------------------------------------------
const Selector = ({ handler, pagingCtx }) => {
  const [expanded, setExpanded] = useState(false);
  let extra = false;
  const perPageOptions = [2, 5, 10, 15, 20, 30, 50, 75, 100].filter((val) => {
    if (val < pagingCtx.nRecords) return true;
    if (extra) return false;
    extra = true;
    return true;
  });
  const { perPage } = pagingCtx;
  const onClick = (e) => {
    if (e.target.toggle) e.target.toggle();
    setExpanded(true);
  };
  return (
    <Fragment>
      Per page{' '}
      {expanded ? (
        <select
          style={{ display: 'hidden' }}
          className="pagination-perpage"
          value={perPage}
          onChange={({ target }) => {
            if (handler) handler({ type: 'perPage', payload: target.value });
            setExpanded(false);
          }}
        >
          {perPageOptions.map((n) => {
            return <option>{n}</option>;
          })}
        </select>
      ) : (
        <Fragment>{perPage}</Fragment>
      )}
      <ChevronDown
        className="pagination-perpage"
        onClick={onClick}
        style={{ paddingLeft: '5px', paddingRight: '5px' }}
        size={15}
        filled
      />
    </Fragment>
  );
};

//-----------------------------------------------------------------
function isDisabled(pagingCtx, which) {
  if (which !== 'pageup' && which !== 'left' && which !== 'pagedown' && which !== 'right') return false; // up and down (i.e. select row) are handled by the table component

  const { curPage } = pagingCtx;
  if (which === 'pageup' || which === 'left') return curPage === 0;

  const { nRecords, perPage } = pagingCtx;
  return curPage === Math.floor(nRecords / perPage) - !(nRecords % perPage);
}

//-----------------------------------------------------------------
const PagingIcon = ({ name, handler, pagingCtx }) => {
  const frstCn =
    'pagination-icons ' +
    (isDisabled(pagingCtx, 'home') || isDisabled(pagingCtx, 'up') || isDisabled(pagingCtx, 'left') ? 'disabled' : '');
  const lastCn =
    'pagination-icons ' +
    (isDisabled(pagingCtx, 'end') || isDisabled(pagingCtx, 'down') || isDisabled(pagingCtx, 'right') ? 'disabled' : '');

  const size = 18;
  const filled = false;
  const func = isDisabled(pagingCtx, name) ? () => {} : (e) => handleClick(e, handler, { type: name });

  switch (name) {
    case 'home':
      return <ChevronsLeft onClick={func} className={frstCn} size={size} filled={filled} />;
    case 'end':
      return <ChevronsRight onClick={func} className={lastCn} size={size} filled={filled} />;
    case 'top':
      return <ChevronsUp onClick={func} className={frstCn} size={size} filled={filled} />;
    case 'bottom':
      return <ChevronsDown onClick={func} className={lastCn} size={size} filled={filled} />;

    case 'left':
      return <ChevronLeft onClick={func} className={frstCn} size={size} filled={filled} />;
    case 'right':
      return <ChevronRight onClick={func} className={lastCn} size={size} filled={filled} />;
    case 'up':
      return <ChevronUp onClick={func} className={frstCn} size={size} filled={filled} />;
    case 'down':
      return <ChevronDown onClick={func} className={lastCn} size={size} filled={filled} />;

    default:
      return <Fragment>{name} </Fragment>;
  }
};
