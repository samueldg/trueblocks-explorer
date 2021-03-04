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
  sendServerCommand,
  sortArray,
  sortStrings,
  handleClick,
  navigate,
  downloadData,
  exportValue,
  replaceRecord,
  stateFromStorage,
} from 'components/utils';

import { useStatus, LOADING, NOT_LOADING } from 'store/status_store';

import { monitorsSchema } from './MonitorsSchema';
import './Monitors.css';

// EXISTING_CODE
// EXISTING_CODE

//---------------------------------------------------------------------------
export const Monitors = (props) => {
  const { monitors, dispatch } = useMonitors();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState(monitorsDefault);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('monitorsTag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [curRecordId, setCurRecordId] = useState('');
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('monitorsPageDetails', 0)));

  // EXISTING_CODE
  // EXISTING_CODE

  const cmdUrl = getApiUrl('monitor');

  const dataQuery = 'modes=monitors&details';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    ret += '&address=' + record_id;
    // EXISTING_CODE
    return ret;
  }

  const monitorsHandler = useCallback(
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
          localStorage.setItem('monitorsPageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('monitorsTag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('monitorsTag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('monitorsTag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({ showing: true, name: 'Edit Monitor', record: record });
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
        case 'delete':
          {
            const cmdQuery = 'delete&terms=' + action.record_id; // + addendum(record, action.record_id);
            statusDispatch(LOADING);
            dispatch(action);
            sendServerCommand(cmdUrl, cmdQuery).then(() => {
              // we assume the delete worked, so we don't reload the data
              statusDispatch(NOT_LOADING);
            });
          }
          break;
        case 'undelete':
          {
            const cmdQuery = 'undelete&terms=' + action.record_id; // + addendum(record, action.record_id);
            statusDispatch(LOADING);
            dispatch(action);
            sendServerCommand(cmdUrl, cmdQuery).then(() => {
              // we assume the delete worked, so we don't reload the data
              statusDispatch(NOT_LOADING);
            });
          }
          break;
        case 'remove':
          {
            const cmdQuery = 'remove&terms=' + action.record_id; // + addendum(record, action.record_id);
            statusDispatch(LOADING);
            sendServerCommand(cmdUrl, cmdQuery).then((theData) => {
              // the command worked, but now we need to reload the data
              refreshMonitorsData(dataQuery, dispatch, mocked);
              statusDispatch(NOT_LOADING);
            });
          }
          break;

        // EXISTING_CODE
        case 'externallink':
          navigate('https://etherscan.io/address/' + action.record_id, true);
          break;
        case 'shift_enter':
        case 'row_doubleclick':
        case 'view':
          navigate('/accounts?addrs=' + action.record_id + (record ? '&name=' + record.name : ''), false);
          //          navigate('/accounts?addrs=' + action.record_id, false);
          break;
        case 'download':
          const exportFields = action.columns.filter((column) => {
            return column.selector.includes('accounting.');
          });
          const str = new Date().toISOString();
          const filename = 'Accounts_' + str.replace(/[ -.T]/g, '_').replace(/Z/, '');
          downloadData('IIF', exportFields, action.data, filename, exportValue, null);
          break;
        // EXISTING_CODE
        default:
          break;
      }
    },
    [dispatch, filtered, statusDispatch, debug, mocked]
  );

  useEffect(() => {
    statusDispatch(LOADING);
    let partialFetch = false;
    // EXISTING_CODE
    // EXISTING_CODE
    if (!partialFetch) {
      refreshMonitorsData(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked, statusDispatch]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, monitorsHandler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  }, [monitorsHandler]);

  useMemo(() => {
    // prettier-ignore
    if (monitors && monitors.data) {
      setTagList(getTagList(monitors));
      const result = monitors.data.filter((item) => {
        // EXISTING_CODE
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [monitors, curTag, statusDispatch]);

  let custom = null;
  let title = 'Monitors';
  // EXISTING_CODE
  // EXISTING_CODE

  const table = getInnerTable(
    monitors,
    curTag,
    filtered,
    title,
    detailLevel,
    searchFields,
    recordIconList,
    monitorsHandler
  );
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        handler={monitorsHandler}
      />
      {mocked && (
        <span className="warning">
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify(monitors, null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add Monitor'} handler={monitorsHandler} object={editDialog.record} columns={monitorsSchema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = (monitors) => {
  // prettier-ignore
  let tagList = sortStrings([...new Set(monitors.data.map((item) => calcValue(item, { selector: 'tags', onDisplay: getFieldValue })))], true);
  tagList.unshift('|');
  tagList.unshift('All');
  tagList.push('|');
  tagList.push('Debug');
  tagList.push('MockData');
  return tagList;
};

//----------------------------------------------------------------------
const getInnerTable = (
  monitors,
  curTag,
  filtered,
  title,
  detailLevel,
  searchFields,
  recordIconList,
  monitorsHandler
) => {
  // EXISTING_CODE
  // EXISTING_CODE
  return (
    <DataTable
      tableName={'monitorsTable'}
      data={filtered}
      columns={monitorsSchema}
      title={title}
      search={true}
      searchFields={searchFields}
      pagination={true}
      recordIcons={recordIconList}
      parentHandler={monitorsHandler}
      detailLevel={detailLevel}
    />
  );
};

// EXISTING_CODE
// EXISTING_CODE

// auto-generate: page-settings
const recordIconList = [
  'ExternalLink',
  'header-Add',
  'Delete/Undelete',
  'Edit/Remove',
  'View/None',
  'footer-QuickBooks',
  'footer-CSV',
  'footer-TXT',
  //
];
const defaultSort = ['tags', 'address'];
const defaultSearch = ['tags', 'address', 'name'];
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refreshMonitorsData(query, dispatch, mocked) {
  getServerData(getApiUrl('status'), query + (mocked ? '&mocked' : '')).then((theData) => {
    let monitors = theData.data;
    // EXISTING_CODE
    if (!mocked) monitors = theData.data[0].caches[0].items;
    // EXISTING_CODE
    theData.data = sortArray(monitors, defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({type: 'success', payload: theData});
  });
}

//----------------------------------------------------------------------
export const monitorsDefault = [];

//----------------------------------------------------------------------
export const monitorsReducer = (state, action) => {
  let monitors = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = monitors.data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          monitors.data = replaceRecord(monitors.data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      monitors = action.payload;
      break;
    default:
    // do nothing
  }
  return monitors;
};

//----------------------------------------------------------------------
export const useMonitors = () => {
  return useContext(GlobalContext).monitors;
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  switch (fieldName) {
    case 'id':
      return record.address;
    case 'tags':
      const array = record.tags.split(':');
      return array.length > 0 ? array[0] : '';
    default:
      break;
  }
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
export function getExportValue(record, fieldName) {
  if (!record) return '';
  const fn = fieldName.replace('accounting.', '').toLowerCase();
  switch (fn) {
    case 'accnt':
      return 'ACCNT';
    case 'name':
      return record.name;
    case 'refnum':
      return record.address.substr(0, 6);
    case 'timestamp':
      return '';
    case 'accnttype':
      return 'BANK';
    case 'obamount':
      return '0.00';
    case 'desc':
      return 'Crypto Wallet';
    case 'accum':
      return record.address;
    case 'scd':
      return '';
    case 'extra':
      return '';
    default:
      break;
  }
  return record[fieldName];
}
// EXISTING_CODE
