/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { defaultToggles, togglesReducer, useToggles } from './panel_store';
import { statusDefault, statusReducer, useStatus, useStatusData, useStatusMeta, useSystemCheck } from './status_store';

//----------------------------------------------------------------------
const GlobalContext = React.createContext({});
export default GlobalContext;

export {
  defaultToggles,
  togglesReducer,
  useToggles,
  statusDefault,
  statusReducer,
  useStatus,
  useStatusData,
  useStatusMeta,
  useSystemCheck,
};

//-----------------------------------------------------------------
export function getPrimaryKey(columns) {
  const ret = columns.filter((c) => c.selector === 'id');
  return ret ? ret[0] : ret;
}

//-----------------------------------------------------------------
export function getAltIconKey(columns) {
  const ret = columns.filter((c) => c.selector === 'monitored');
  if (ret) return ret;
  return columns.filter((c) => c.selector === 'deleted');
}

//----------------------------------------------------------------------
export const getApiUrl = (route) => {
  let url = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost';
  let port = process.env.REACT_APP_API_PORT
     ? process.env.REACT_APP_API_PORT
     : "8080";
  return 'http://' + url + ':' + port + '/' + route;
};
