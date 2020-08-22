/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useContext } from 'react';

import GlobalContext, { getApiUrl } from 'store';
import { currentPage } from 'components/utils';

import { ExplorerBlocks } from './ExplorerBlocks';
import { ExplorerTransactions } from './ExplorerTransactions';
import { ExplorerReceipts } from './ExplorerReceipts';
import { ExplorerLogs } from './ExplorerLogs';
import { ExplorerTraces } from './ExplorerTraces';

//----------------------------------------------------------------------
export const Explorer = () => {
  switch (currentPage().subpage) {
    case 'transactions':
      return <ExplorerTransactions />;
    case 'receipts':
      return <ExplorerReceipts />;
    case 'logs':
      return <ExplorerLogs />;
    case 'traces':
      return <ExplorerTraces />;
    case 'blocks':
    default:
      return <ExplorerBlocks />;
  }
  // return <div>{'Actual Explorer Page: ' + currentPage().page + ' ' + currentPage().subpage}</div>;
};

//----------------------------------------------------------------------
export const explorerDefault = [];

//----------------------------------------------------------------------
export const explorerReducer = (state, action) => {
  let ret = state;
  switch (action.type) {
    case 'update':
      ret = action.payload;
      break;
    default:
    // do nothing
  }
  // TODO(tjayrush): this data is on the backend -- we do not store it locally
  // localStorage.setItem('otherState', JSON.stringify(ret));
  return ret;
};

//----------------------------------------------------------------------
export const useExplorer = () => {
  return useContext(GlobalContext).explorer;
};
