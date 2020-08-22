/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import Mousetrap from 'mousetrap';

import GlobalContext, { getApiUrl } from 'store';

import { DataTable, PageCaddie, Dialog } from 'components';
import {
  calcValue,
  getServerData,
  sortArray,
  sortStrings,
  handleClick,
  replaceRecord,
  stateFromStorage,
  formatFieldByType,
} from 'components/utils';

import { useStatus, LOADING, NOT_LOADING } from 'store/status_store';

import { cachesSchema } from './CachesSchema';
import './Caches.css';

// EXISTING_CODE
// EXISTING_CODE

//---------------------------------------------------------------------------
export const Caches = (props) => {
  const { caches, dispatch } = useCaches();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState(cachesDefault);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('cachesTag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [curRecordId, setCurRecordId] = useState('');
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('cachesPageDetails', 0)));

  // EXISTING_CODE
  // EXISTING_CODE

  const dataQuery = 'modes=abis%20caches&types=all&details&depth=1';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    // EXISTING_CODE
    return ret;
  }

  const cachesHandler = useCallback(
    (action) => {
      const record_id = action.record_id;
      setCurRecordId(record_id);
      let record = filtered.filter((record) => {
        return record_id && calcValue(record, { selector: 'id', onDisplay: getFieldValue }) === record_id;
      });
      if (record) record = record[0];
      switch (action.type.toLowerCase()) {
        case 'toggle-detail':
          setDetailLevel((detailLevel + 1) % 3);
          localStorage.setItem('cachesPageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('cachesTag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('cachesTag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('cachesTag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({ showing: true, name: 'Edit Cache', record: record });
          break;
        case 'close':
        case 'cancel':
          setEditDialog({ showing: false, record: {} });
          break;
        case 'okay':
          // let query = 'editCmd=edit';
          // query += record ? 'edit' : 'add';
          // query += '&term=';
          // query += "!" + (record ? record.)
          // query += '&terms=A!0xaaaaeeeeddddccccbbbbaaaa0e92113ea9d19ca3!C!D!E!F!false!false';
          // query += '&expand';
          // query += record ? (record.is_custom ? '&to_custom' : '') : '';
          // query += '&to_custom=false';
          // statusDispatch(LOADING);
          // dispatch(action);
          // sendServerCommand(url, query).then(() => {
          //  // we assume the delete worked, so we don't reload the data
          //  statusDispatch(NOT_LOADING);
          // });
          setEditDialog({ showing: false, record: {} });
          break;

        // EXISTING_CODE
        // EXISTING_CODE
        default:
          break;
      }
    },
    [dispatch, filtered, statusDispatch]
  );

  useEffect(() => {
    statusDispatch(LOADING);
    let partialFetch = false;
    // EXISTING_CODE
    // EXISTING_CODE
    if (!partialFetch) {
      refreshCachesData(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, cachesHandler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  }, [cachesHandler]);

  useMemo(() => {
    // prettier-ignore
    if (caches && caches.data) {
      setTagList(getTagList(caches));
      const result = caches.data.filter((item) => {
        // EXISTING_CODE
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [caches, curTag, statusDispatch]);

  let custom = null;
  let title = 'Caches';
  // EXISTING_CODE
  // EXISTING_CODE

  const table = getInnerTable(
    caches,
    curTag,
    filtered,
    title,
    detailLevel,
    searchFields,
    recordIconList,
    cachesHandler
  );
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        handler={cachesHandler}
      />
      {mocked && (
        <span className='warning'>
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify(caches, null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add Cache'} handler={cachesHandler} object={editDialog.record} columns={cachesSchema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = (caches) => {
  // prettier-ignore
  let tagList = sortStrings([...new Set(caches.data.map((item) => calcValue(item, { selector: 'tags', onDisplay: getFieldValue })))], true);
  tagList.unshift('|');
  tagList.unshift('All');
  tagList.push('|');
  tagList.push('Debug');
  tagList.push('MockData');
  return tagList;
};

//----------------------------------------------------------------------
const getInnerTable = (caches, curTag, filtered, title, detailLevel, searchFields, recordIconList, cachesHandler) => {
  // EXISTING_CODE
  // EXISTING_CODE
  return (
    <DataTable
      tableName={'cachesTable'}
      data={filtered}
      columns={cachesSchema}
      title={title}
      search={true}
      searchFields={searchFields}
      pagination={true}
      recordIcons={recordIconList}
      parentHandler={cachesHandler}
      detailLevel={detailLevel}
    />
  );
};

// EXISTING_CODE
// EXISTING_CODE

// auto-generate: page-settings
const recordIconList = [
  'header-Add',
  'Delete/Undelete',
  'Edit/Remove',
  'footer-CSV',
  'footer-TXT',
  //
];
const defaultSort = ['path'];
const defaultSearch = ['path'];
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refreshCachesData(query, dispatch, mocked) {
  getServerData(getApiUrl('status'), query + (mocked ? '&mockData' : '')).then((theData) => {
    let caches = theData.data;
    // EXISTING_CODE
    if (caches) caches = caches[0].caches;
    // EXISTING_CODE
    theData.data = sortArray(caches, defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({ type: 'success', payload: theData });
  });
}

//----------------------------------------------------------------------
export const cachesDefault = [];

//----------------------------------------------------------------------
export const cachesReducer = (state, action) => {
  let caches = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = caches.data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          caches.data = replaceRecord(caches.data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      caches = action.payload;
      break;
    default:
    // do nothing
  }
  return caches;
};

//----------------------------------------------------------------------
export const useCaches = () => {
  return useContext(GlobalContext).caches;
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  switch (fieldName) {
    case 'id':
      return record.path;
    case 'bytesPerFile':
      return record.nFiles ? formatFieldByType('double', record.sizeInBytes / record.nFiles, 4) : 0;
    case 'perFolder':
      return record.nFolders ? formatFieldByType('double', record.nFiles / record.nFolders, 4) : 0;
    default:
      break;
  }
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
// EXISTING_CODE
