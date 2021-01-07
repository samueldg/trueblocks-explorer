/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import React, { Fragment, useEffect, useState, useMemo, useCallback, useContext } from 'react';
import Mousetrap from 'mousetrap';

import GlobalContext, { getApiUrl } from 'store';

import { DataTable, ObjectTable, ChartTable, PageCaddie, Dialog } from 'components';
import { calcValue, getServerData, sortArray, handleClick, navigate, replaceRecord, stateFromStorage } from 'components/utils';

import { useStatus, LOADING, NOT_LOADING } from 'store/status_store';

import { summarySchema } from './SummarySchema';
import './Summary.css';

// EXISTING_CODE
import { SidebarTable } from 'components';
import sumImage from 'assets/img/summary.png';
// EXISTING_CODE

//---------------------------------------------------------------------------
export const Summary = (props) => {
  const { summary, dispatch } = useSummary();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState(summaryDefault);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('summaryTag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [curRecordId, setCurRecordId] = useState('');
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('summaryPageDetails', 0)));

  // EXISTING_CODE
  // EXISTING_CODE

  const dataQuery = 'addrs=' + summary.value + '&accounting';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    // EXISTING_CODE
    return ret;
  }

  const summaryHandler = useCallback(
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
          localStorage.setItem('summaryPageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('summaryTag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('summaryTag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('summaryTag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({ showing: true, name: 'Edit Summary', record: record });
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
      refreshSummaryData(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, summaryHandler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  }, [summaryHandler]);

  useMemo(() => {
    // prettier-ignore
    if (summary && summary.data) {
      setTagList(getTagList(summary));
      const result = summary.data.filter((item) => {
        // EXISTING_CODE
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [summary, curTag, statusDispatch]);

  let custom = null;
  let title = 'Summary';
  // EXISTING_CODE
  // EXISTING_CODE

  const table = <img height="1050px" className="summary" alt={sumImage} src={sumImage} />;
  // const table = getInnerTable(
  //   summary,
  //   curTag,
  //   filtered,
  //   title,
  //   detailLevel,
  //   searchFields,
  //   recordIconList,
  //   summaryHandler
  // );
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        handler={summaryHandler}
      />
      {mocked && (
        <span className="warning">
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify(summary, null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add Summary'} handler={summaryHandler} object={editDialog.record} columns={summarySchema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = (summary) => {
  // prettier-ignore
  let tagList = ['Eth', 'Not Eth', '|', 'Tokens', 'Grants', 'Hide Outgoing', 'Hide Airdrops', 'Show Airdrops', '|', 'Reconciled', 'Unreconciled', '|', 'Neighbors', 'Balances', 'Functions', 'Events', 'Messages', 'Creations', 'SelfDestructs'];
  tagList.unshift('|');
  tagList.unshift('All');
  tagList.push('|');
  tagList.push('Debug');
  tagList.push('MockData');
  return tagList;
};

//----------------------------------------------------------------------
const getInnerTable = (summary, curTag, filtered, title, detailLevel, searchFields, recordIconList, summaryHandler) => {
  // EXISTING_CODE
  // EXISTING_CODE
  return (
    <SidebarTable
      tableName={'summaryTable'}
      data={filtered}
      columns={summarySchema}
      title={title}
      searchFields={searchFields}
      recordIcons={recordIconList}
      parentHandler={summaryHandler}
      detailLevel={detailLevel}
    />
  );
};

// EXISTING_CODE
// EXISTING_CODE

// auto-generate: page-settings
const recordIconList = [
  'ExternalLink',
  'footer-CSV',
  'footer-TXT',
  'footer-Import',
  //
];
const defaultSort = ['blockNumber', 'transactionIndex'];
const defaultSearch = ['blockNumber', 'hash', 'from', 'fromName', 'to', 'toName', 'encoding', 'compressedTx'];
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refreshSummaryData(query, dispatch, mocked) {
  getServerData(getApiUrl('export'), query + (mocked ? '&mockData' : '')).then((theData) => {
    let summary = theData.data;
    // EXISTING_CODE
    // EXISTING_CODE
    theData.data = sortArray(summary, defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({ type: 'success', payload: theData });
  });
}

//----------------------------------------------------------------------
export const summaryDefault = [];

//----------------------------------------------------------------------
export const summaryReducer = (state, action) => {
  let summary = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = summary.data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          summary.data = replaceRecord(summary.data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      summary = action.payload;
      break;
    default:
    // do nothing
  }
  return summary;
};

//----------------------------------------------------------------------
export const useSummary = () => {
  return useContext(GlobalContext).summary;
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
export function getExportValue(record, fieldName) {
  return getFieldValue(record, fieldName);
}
// EXISTING_CODE
