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
import { calcValue, getServerData, sendServerCommand, sortArray, sortStrings, handleClick, replaceRecord, stateFromStorage } from 'components/utils';

import { useStatus, LOADING, NOT_LOADING } from 'store/status_store';

import { entitiesSchema } from './EntitiesSchema';
import './Entities.css';

// EXISTING_CODE
// EXISTING_CODE

//---------------------------------------------------------------------------
export const Entities = (props) => {
  const { entities, dispatch } = useEntities();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState(entitiesDefault);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('entitiesTag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [curRecordId, setCurRecordId] = useState('');
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('entitiesPageDetails', 0)));

  // EXISTING_CODE
  // EXISTING_CODE

  const cmdUrl = getApiUrl('names');

  const dataQuery = 'entities';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    // EXISTING_CODE
    return ret;
  }

  const entitiesHandler = useCallback(
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
          localStorage.setItem('entitiesPageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('entitiesTag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('entitiesTag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('entitiesTag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({showing: true, name: 'Edit Entity', record: record});
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
            const cmdQuery = 'delete&terms=' + action.record_id + addendum(record, action.record_id);
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
            const cmdQuery = 'undelete&terms=' + action.record_id + addendum(record, action.record_id);
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
            const cmdQuery = 'remove&terms=' + action.record_id + addendum(record, action.record_id);
            statusDispatch(LOADING);
            sendServerCommand(cmdUrl, cmdQuery).then((theData) => {
              // the command worked, but now we need to reload the data
              refreshEntitiesData(dataQuery, dispatch, mocked);
              statusDispatch(NOT_LOADING);
            });
          }
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
      refreshEntitiesData(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, entitiesHandler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  }, [entitiesHandler]);

  useMemo(() => {
    // prettier-ignore
    if (entities && entities.data) {
      setTagList(getTagList(entities));
      const result = entities.data.filter((item) => {
        // EXISTING_CODE
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [entities, curTag, statusDispatch]);

  let custom = null;
  let title = 'Entities';
  // EXISTING_CODE
  // EXISTING_CODE

  const table = getInnerTable(entities, curTag, filtered, title, detailLevel, searchFields, recordIconList, entitiesHandler);
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        handler={entitiesHandler}
      />
      {mocked && (
        <span className="warning">
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify(entities, null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add Entity'} handler={entitiesHandler} object={editDialog.record} columns={entitiesSchema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = (entities) => {
  // prettier-ignore
  let tagList = sortStrings([...new Set(entities.data.map((item) => calcValue(item, { selector: 'tags', onDisplay: getFieldValue })))], true);
  tagList.unshift('|');
  tagList.unshift('All');
  tagList.push('|');
  tagList.push('Debug');
  tagList.push('MockData');
  return tagList;
};

//----------------------------------------------------------------------
const getInnerTable = (entities, curTag, filtered, title, detailLevel, searchFields, recordIconList, entitiesHandler) => {
  // EXISTING_CODE
  // EXISTING_CODE
  return (
    <DataTable
      tableName={'entitiesTable'}
      data={filtered}
      columns={entitiesSchema}
      title={title}
      search={true}
      searchFields={searchFields}
      pagination={true}
      recordIcons={recordIconList}
      parentHandler={entitiesHandler}
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
  'View/None',
  'footer-CSV',
  'footer-TXT',
  //
];
const defaultSort = ['tags', 'name', 'client'];
const defaultSearch = ['tags', 'name', 'client'];
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refreshEntitiesData(query, dispatch, mocked) {
  getServerData(getApiUrl('names'), query + (mocked ? '&mocked' : '')).then((theData) => {
    let entities = theData.data;
    // EXISTING_CODE
    // EXISTING_CODE
    theData.data = sortArray(entities, defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({ type: 'success', payload: theData });
  });
}

//----------------------------------------------------------------------
export const entitiesDefault = [];

//----------------------------------------------------------------------
export const entitiesReducer = (state, action) => {
  let entities = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = entities.data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          entities.data = replaceRecord(entities.data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      entities = action.payload;
      break;
    default:
    // do nothing
  }
  return entities;
};

//----------------------------------------------------------------------
export const useEntities = () => {
  return useContext(GlobalContext).entities;
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
