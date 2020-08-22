/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import './Search.css';

//-----------------------------------------------------------------
export const Search = ({ enabled = false, searchText = '', searchFields = [], handler = null }) => {
  if (!enabled) return <div></div>; // we need this div so spacing of title works right
  if (!handler) return <div className="warning">Search enabled, but no handler given</div>;
  if (searchFields.length === 0) return <div className="warning">Search enabled, but no search fields given</div>;

  return (
    <div className="search-container">
      <input
        className="search"
        onChange={(e) => {
          handler({ type: 'update_filter', payload: e.target.value });
        }}
        placeholder={'Search...'}
        value={searchText}
      ></input>
      <button onClick={() => handler({ type: 'clear_filter' })}  className="clear-button">
        x
      </button>
    </div>
  );
};
