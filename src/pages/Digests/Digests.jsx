/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import React, { useEffect, useState, useCallback, useContext } from 'react';

import GlobalContext, { getApiUrl } from 'store';
import { useStatus, LOADING, NOT_LOADING, useStatusMeta } from 'store/status_store';

import { GridTable, ChartTable, DataTable, PageCaddie } from 'components';
import { getServerData, currentPage, sortArray } from 'components/utils';

// EXISTING_CODE
// EXISTING_CODE

import { digestsSchema } from './DigestsSchema';
import './Digests.css';

//---------------------------------------------------------------------------
export const Digests = () => {
  const { digests, dispatch } = useDigests();

  //const [filtered, setFiltered] = useState(digestsDefault);
  //const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('digestsTag'));
  //const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [start, setStart] = useState(0);
  const [source] = useState(currentPage().subpage);
  const [query] = useState('modes=index&details');

  // prettier-ignore
  const digestsHandler = useCallback(
    (action) => {
      switch (action.type.toLowerCase()) {
        case 'select-tag':
          setTag(action.payload);
          localStorage.setItem('digestsTag', action.payload);
          break;
        // EXISTING_CODE
        case 'set-start':
          setStart((start + 3000000) % 9000000);
          break;
        // EXISTING_CODE
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    statusDispatch(LOADING);
    getServerData(getApiUrl('status'), query).then((theData) => {
      dispatch({ type: 'success', payload: theData.data[0].caches[0].items });
      statusDispatch(NOT_LOADING);
    });
  }, [source, query, dispatch]);

  // EXISTING_CODE
  // EXISTING_CODE

  useEffect(() => {}, [start]);

  const meta = useStatusMeta();
  const largest = meta.client === 'n/a' ? meta.unripe : meta.client;
  const status = { max: largest, completed: meta.finalized };

  let filtered = curTag === 'graph-view' ? digests.filter((digest) => digest.firstAppearance >= start) : digests;

  let view = undefined;
  if (curTag === 'data-view') {
    view = (
      <DataTable
        tableName={'digestsTable'}
        data={filtered}
        columns={digestsSchema}
        title="Digests"
        search={false}
        searchFields={searchFields}
        pagination={true}
        recordIcons={recordIconList}
        parentHandler={digestsHandler}
      />
    );
    //
  } else if (curTag === 'graph-view') {
    view = (
      <ChartTable
        columns={digestsSchema}
        data={filtered}
        title=""
        search={false}
        chartName="digests"
        chartCtx={{ defPair: ['firstTs', 'nAddresses'] }}
        pagination={true}
      />
    );
    //
  } else {
    // prettier-ignore
    view = (
      <GridTable
        data={filtered}
        columns={digestsSchema}
        title="Grid View"
        meta={status}
        pagination={true}
      />
    );
    //
  }

  return (
    <div>
      <PageCaddie
        caddieName="Digests"
        caddieData={['grid-view', 'data-view', 'graph-view']}
        current={curTag}
        useProgress={true}
        handler={digestsHandler}
      />
      {view}
    </div>
  );
};

// auto-generate: page-settings
// auto-generate: page-settings

//----------------------------------------------------------------------
function refreshData(url, query, dispatch) {
  getServerData(url, query).then((theData) => {
    let digests = theData.data;
    // EXISTING_CODE
    // EXISTING_CODE
    theData.data = sortArray(digests, defaultSort, ['asc', 'asc', 'asc']);
    dispatch({ type: 'success', payload: theData.data });
  });
}

//----------------------------------------------------------------------
export const digestsDefault = [];

//----------------------------------------------------------------------
export const digestsReducer = (state, action) => {
  let ret = state;
  switch (action.type.toLowerCase()) {
    /*
    case 'undelete':
    case 'delete':
      {
        const record = ret.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          ret = replaceRecord(ret, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    */
    case 'success':
      ret = action.payload;
      break;
    default:
    // do nothing
  }
  return ret;
};

//----------------------------------------------------------------------
export const useDigests = () => {
  return useContext(GlobalContext).digests;
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  switch (fieldName) {
    case 'id':
      return record.filename.replace('.bin', '');
    case 'blockRange':
      return record.filename.replace('.bin', '');
    case 'blockSpan':
      return record.latestAppearance - record.firstAppearance + 1;
    case 'duration': {
      let s = record.latestTs - record.firstTs + 1;
      let m = Math.floor(s / 60);
      let h = Math.floor(m / 60);
      const d = Math.floor(h / 24);
      h = h % 24;
      m = m % 60;
      s = s % 60;
      return (
        (d === 0 ? '' : d + 'd ') +
        (d === 0 && h === 0 ? '' : (d === 0 ? h : pad2(h)) + 'h ') +
        pad2(m) +
        'm ' +
        pad2(s) +
        's'
      );
    }
    case 'seconds':
      return record.latestTs - record.firstTs + 1;
    case 'addrsPerBlock': {
      const n = record.latestAppearance - record.firstAppearance + 1;
      return n === 0 ? 0 : record.nAddresses / n;
    }
    case 'appsPerBlock': {
      const n = record.latestAppearance - record.firstAppearance + 1;
      return n === 0 ? 0 : record.nAppearances / n;
    }
    case 'appsPerAddr':
      return record.nAddresses === 0 ? 0 : record.nAppearances / record.nAddresses;
    default:
      break;
  }
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
const recordIconList = [];
const defaultSort = [];
const defaultSearch = [];
// EXISTING_CODE

//-----------------------------------------------------
export function pad2(n) {
  const str = JSON.stringify(n);
  if (str.length >= 2) return str;
  const fix = Array(2 - str.length)
    .fill()
    .map((_, idx) => idx);
  return fix.reduce((s, i) => {
    return '0' + s;
  }, str);
}
