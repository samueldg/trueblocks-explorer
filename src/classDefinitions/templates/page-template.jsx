/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import React, { [{FRAGMENT}]useEffect, useState, useMemo, useCallback, useContext } from 'react';
import Mousetrap from 'mousetrap';

import GlobalContext, { getApiUrl } from 'store';

import { [{TABLE_IMPORT}], Dialog } from 'components';
import { calcValue, [{UTILS_IMPORT}] } from 'components/utils';

import { [{STATUS_STORE_IMPORT}] } from 'store/status_store';

import { [{LONG}]Schema } from './[{PROPER}]Schema';
import './[{PROPER}].css';

// EXISTING_CODE
// EXISTING_CODE

//---------------------------------------------------------------------------
export const [{PROPER}] = (props) => {
  const { [{LONG}], dispatch } = use[{PROPER}]();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState([{LONG}]Default);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('[{LONG}]Tag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [curRecordId, setCurRecordId] = useState('');
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('[{LONG}]PageDetails', 0)));

  // EXISTING_CODE
  // EXISTING_CODE
[{CMDURL}]

  const dataQuery = '[{DATAQUERY}]';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    // EXISTING_CODE
    return ret;
  }

  const [{LONG}]Handler = useCallback(
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
          localStorage.setItem('[{LONG}]PageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('[{LONG}]Tag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('[{LONG}]Tag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('[{LONG}]Tag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({ showing: true, name: 'Edit [{SINGULAR}]', record: record });
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
[{DELETE_CMD}]

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
      refresh[{PROPER}]Data(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, [{LONG}]Handler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  }, [[{LONG}]Handler]);

  useMemo(() => {
    // prettier-ignore
    if ([{LONG}] && [{LONG}].data) {
      setTagList(getTagList([{LONG}]));
      const result = [{LONG}].data.filter((item) => {
        // EXISTING_CODE
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [[{LONG}], curTag, statusDispatch]);

  let custom = null;
  let title = '[{PROPER}]';
  // EXISTING_CODE
  // EXISTING_CODE

  const table = getInnerTable([{LONG}], curTag, filtered, title, detailLevel, searchFields, recordIconList, [{LONG}]Handler);
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        handler={[{LONG}]Handler}
      />
      {mocked && (
        <span className="warning">
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify([{LONG}], null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add [{SINGULAR}]'} handler={[{LONG}]Handler} object={editDialog.record} columns={[{LONG}]Schema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = ([{LONG}]) => {
  // prettier-ignore
  let tagList = [{DEFAULT_TAGS}];
  tagList.unshift('|');
  tagList.unshift('All');
  tagList.push('|');
  tagList.push('Debug');
  tagList.push('MockData');
  return tagList;
};

//----------------------------------------------------------------------
const getInnerTable = ([{LONG}], curTag, filtered, title, detailLevel, searchFields, recordIconList, [{LONG}]Handler) => {
  // EXISTING_CODE
  // EXISTING_CODE
  return (
    <[{DEFAULT_TABLE}]
      tableName={'[{LONG}]Table'}
      data={filtered}
      columns={[{LONG}]Schema}
      title={title}
      search={true}
      searchFields={searchFields}
      pagination={true}
      recordIcons={recordIconList}
      parentHandler={[{LONG}]Handler}
      detailLevel={detailLevel}
    />
  );
};

// EXISTING_CODE
// EXISTING_CODE

// auto-generate: page-settings
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refresh[{PROPER}]Data(query, dispatch, mocked) {
  getServerData(getApiUrl('[{DATAROUTE}]'), query + (mocked ? '&mockData' : '')).then((theData) => {
    let [{LONG}] = theData.data;
    // EXISTING_CODE
    // EXISTING_CODE
    theData.data = sortArray([{LONG}], defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({ type: 'success', payload: theData });
  });
}

//----------------------------------------------------------------------
export const [{LONG}]Default = [];

//----------------------------------------------------------------------
export const [{LONG}]Reducer = (state, action) => {
  let [{LONG}] = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = [{LONG}].data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          [{LONG}].data = replaceRecord([{LONG}].data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      [{LONG}] = action.payload;
      break;
    default:
    // do nothing
  }
  return [{LONG}];
};

//----------------------------------------------------------------------
export const use[{PROPER}] = () => {
  return useContext(GlobalContext).[{LONG}];
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
// EXISTING_CODE
