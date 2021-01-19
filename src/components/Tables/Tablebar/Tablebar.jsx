/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { Pagination } from './Pagination';
import { Search } from './Search';
import { getIcon } from 'pages/utils';

import './Tablebar.css';
import { handleClick } from 'components/utils';

//-----------------------------------------------------------------------
export const Tablebar = ({
  title = '',
  search = false,
  searchFields = [],
  filterText = '',
  pagination = false,
  pagingCtx = { curPage: 0, paginationParts: '' },
  handler = null,
  asHeader = true,
  footerIcons = null,
}) => {
  const parts = pagingCtx.paginationParts;
  let searchPart = true;
  let titlePart = true;
  let arrowsPart = true;
  if (typeof parts === 'string') {
    searchPart = parts === '';
    titlePart = parts === '';
    arrowsPart = true;
  }
  const count = searchPart + titlePart + arrowsPart;
  const header = (
    <div className="tablebar-container">
      <div
        style={{ display: 'grid', gridTemplateColumns: count === 1 ? '1fr' : count === 2 ? '1fr 1fr' : '12fr 12fr 12fr' }}
      >
        {searchPart && (
          <Search enabled={search} searchFields={searchFields} searchText={filterText} handler={handler} />
        )}
        {titlePart && <Title title={title} />}
        <Pagination enabled={pagination} handler={handler} pagingCtx={pagingCtx} />
      </div>
    </div>
  );
  const footer = <TableFooterRow searchFields={searchFields} footerIcons={footerIcons} handler={handler} />;
  return asHeader ? header : footer;
};

//-----------------------------------------------------------------------
const Title = ({ title }) => {
  let tit = decodeURIComponent(title.substr(0, 45).replace(/\+/g, '%20'));
  if (title.length > 45) tit += '...';
  return <div className="at-title">{tit}</div>;
};

//-----------------------------------------------------------------
const TableFooterRow = ({ searchFields, footerIcons, handler }) => {
  const style1 = {
    alignSelf: 'start',
    justifySelf: 'end',
    display: 'flex',
  };

  return (
    <div key="footer-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr' }}>
      <div>
        Searching fields:{' '}
        <div style={{ display: 'inline', fontStyle: 'italic' }}>
          {searchFields &&
            searchFields
              .map((field) => {
                return field;
              })
              .join(', ')}
        </div>
      </div>
      <div style={{ justifySelf: 'center' }}></div>
      <div style={style1}>
        {footerIcons.map((a, index) => {
          const value = a.replace('footer-', '').split('/')[0];
          const lowValue = value.toLowerCase();
          switch (lowValue) {
            case 'xero':
            case 'quickbooks':
            case 'csv':
            case 'txt':
            case 'import':
              return (
                <button onClick={(e) => handleClick(e, handler, { type: 'download', fmt: value })} key={value}>
                  {value}
                </button>
              );
            default:
              return getIcon(index, value, false, true, 18);
          }
        })}
      </div>
    </div>
  );
};
