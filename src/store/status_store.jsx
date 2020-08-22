/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import { useContext } from 'react';

import GlobalContext, { getApiUrl } from 'store';
import { stateFromStorage } from 'components/utils';

//----------------------------------------------------------------------
export const statusDefault = {
  data: [
    {
      trueblocks_version: '',
      client_version: '',
      scraper_version: '',
    },
  ],
  meta: {
    ripe: 0,
    unripe: 0,
    staging: 0,
    finalized: 0,
    client: 0,
  },
  loading: true,
  mocked: stateFromStorage('mocked', false),
};

//----------------------------------------------------------------------
export const statusReducer = (state, action) => {
  switch (action.type) {
    case 'mocked':
      localStorage.setItem('mocked', action.payload);
      return { ...state, mocked: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'success':
      return { ...action.payload, loading: false, mocked: state.mocked };
    case 'fail':
      return { ...statusDefault, loading: false, mocked: state.mocked };
    default:
      return state;
  }
};

//----------------------------------------------------------------------
export const useStatus = () => {
  return useContext(GlobalContext).status;
};
export const useStatusData = () => {
  const { state } = useStatus();
  if (!state) {
    return statusDefault.data[0];
  }
  if (!state || !state.data) {
    return statusDefault.data[0];
  }
  if (!state || !state.data || !state.data[0]) {
    return statusDefault.data[0];
  }
  if (!state || !state.data || !state.data[0] || state.error) {
    return statusDefault.data[0];
  }
  return state.data[0];
};
export const useStatusMeta = () => {
  const { state } = useStatus();
  if (!state || !state.data || !state.data[0] || state.error) return statusDefault.meta;
  return state.meta;
};
export const useMonitorMap = () => {
  const caches = useStatusData().caches;
  const monitorCache =
    caches &&
    caches.filter &&
    caches.filter((cache) => {
      return cache.type === 'CMonitorCache';
    });
  if (!monitorCache || monitorCache.length === 0) return null;
  if (!monitorCache[0].addrs) return null;
  const result = monitorCache[0].addrs.reduce((map, item) => {
    map[item] = true;
    return map;
  }, {});
  return result;
};

export const LOADING = { type: 'loading', payload: true };
export const NOT_LOADING = { type: 'loading', payload: false };

//----------------------------------------------------------------------
export const useSystemCheck = (name) => {
  // Hooks forces us to 'use' non-conditionally
  const loading = useStatus().state.loading;
  const data = useStatusData();

  if (loading) return true;
  if (!data) return false;

  const apiOkay = !data.is_testing && data.trueblocks_version !== '';
  const nodeOkay = data.client_version !== '' && data.client_version !== 'Not running';
  const scraperOkay = data.is_scraping;
  const sharingOkay = false;
  switch (name) {
    case 'api':
      return apiOkay;
    case 'node':
      return nodeOkay;
    case 'scraper':
      return scraperOkay;
    case 'sharing':
      return sharingOkay;
    case 'system':
      return apiOkay && nodeOkay;
    default:
      return false;
  }
};
