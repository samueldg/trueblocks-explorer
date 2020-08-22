/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import { useContext } from 'react';

import GlobalContext, { getApiUrl } from 'store';

//----------------------------------------------------------------------
export const defaultToggles = {
  menu: true,
  content: true,
  status: true,
  help: false,
};

//----------------------------------------------------------------------
export const togglesReducer = (state, action) => {
  let ret = state;
  switch (action.type) {
    case 'collapse':
      ret = { menu: false, content: true, status: false, help: false };
      break;
    case 'expand':
      ret = { menu: true, content: true, status: true, help: true };
      break;
    case 'menu':
      ret = { ...state, menu: !state.menu };
      break;
    case 'content':
      ret = { ...state, content: !state.content };
      break;
    case 'status':
      ret = { ...state, status: !state.status };
      break;
    case 'help':
      ret = { ...state, help: !state.help };
      break;
    case 'reset':
      ret = defaultToggles;
      break;
    default:
      break;
  }
  localStorage.setItem('panelState', JSON.stringify(ret));
  return ret;
};

//----------------------------------------------------------------------
export const useToggles = () => {
  return useContext(GlobalContext).panels;
};
