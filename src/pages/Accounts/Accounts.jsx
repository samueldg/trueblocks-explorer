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
import {
  calcValue,
  getServerData,
  sortArray,
  handleClick,
  navigate,
  replaceRecord,
  exportValue,
  downloadData,
  stateFromStorage,
  formatFieldByType,
} from 'components/utils';

import { useStatus, LOADING, NOT_LOADING } from 'store/status_store';

import { accountsSchema } from './AccountsSchema';
import './Accounts.css';

// EXISTING_CODE
import { currentPage } from 'components/utils';
import { SidebarTable } from 'components';
import { getIcon } from 'pages/utils';
let g_focusValue = '';
let g_Handler = null;
const useMountEffect = (fun) => useEffect(fun, []);
// EXISTING_CODE

//---------------------------------------------------------------------------
export const Accounts = (props) => {
  const { accounts, dispatch } = useAccounts();
  const mocked = useStatus().state.mocked;
  const statusDispatch = useStatus().dispatch;

  const [filtered, setFiltered] = useState(accountsDefault);
  const [tagList, setTagList] = useState([]);
  const [searchFields] = useState(defaultSearch);
  const [curTag, setTag] = useState(localStorage.getItem('accountsTag') || 'All');
  const [editDialog, setEditDialog] = useState({ showing: false, record: {} });
  const [debug, setDebug] = useState(false);
  const [detailLevel, setDetailLevel] = useState(Number(stateFromStorage('accountsPageDetails', 0)));

  // EXISTING_CODE
  const [recordCount, setRecordCount] = useState(0);
  const { params } = currentPage();
  const addresses = params[0];
  const name = params.length > 1 ? params[1].value : '';
  g_focusValue = addresses.value && addresses.value.toLowerCase();
  // EXISTING_CODE

  const dataQuery = 'addrs=' + addresses.value + '&staging&accounting&ether&write_txs';
  function addendum(record, record_id) {
    let ret = '';
    // EXISTING_CODE
    ret = '';
    // EXISTING_CODE
    return ret;
  }

  const accountsHandler = useCallback(
    (action) => {
      const record_id = action.record_id;
      let record = filtered.filter((record) => {
        return record_id && calcValue(record, { selector: 'id', onDisplay: getFieldValue }) === record_id;
      });
      if (record) record = record[0];
      switch (action.type.toLowerCase()) {
        case 'toggle-detail':
          setDetailLevel((detailLevel + 1) % 3);
          localStorage.setItem('accountsPageDetails', (detailLevel + 1) % 3);
          break;
        case 'select-tag':
          if (action.payload === 'Debug') {
            setDebug(!debug);
            setTag('All');
            localStorage.setItem('accountsTag', 'All');
          } else if (action.payload === 'MockData') {
            statusDispatch({ type: 'mocked', payload: !mocked });
            setTag('All');
            localStorage.setItem('accountsTag', 'All');
          } else {
            setTag(action.payload);
            localStorage.setItem('accountsTag', action.payload);
          }
          break;
        case 'add':
          setEditDialog({ showing: true, record: {} });
          break;
        case 'enter':
        case 'edit':
          if (record) setEditDialog({ showing: true, name: 'Edit Account', record: record });
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
        case 'addmonitor':
          // {
          //   const cmdQuery = 'addrs=' + action.record_id + '&dollars';
          //   statusDispatch(LOADING);
          //   sendServerCommand(getApiUrl('export'), cmdQuery).then((theData) => {
          //     // the command worked, but now we need to reload the data
          //     statusDispatch(NOT_LOADING);
          //     if (editDialog) {
          //       // only navigate if the user hasn't shut the dialog
          //       navigate('/accounts?addrs=' + action.record_id, false);
          //     }
          //   });
          // }
          // setEditDialog({ showing: true, name: 'Reload', record: record });
          navigate('/accounts?addrs=' + action.record_id + (record ? '&name=' + record.name : ''), false);
          break;
        case 'view':
          navigate('/accounts?addrs=' + action.record_id + (record ? '&name=' + record.name : ''), false);
          break;
        case 'row-changed':
          break;
        case 'internallink':
          if (record) navigate('/explorer/transactions?transactions=' + record.hash, true);
          break;
        case 'externallink':
          if (record && (record.from === '0xBlockReward' || record.from === '0xUncleReward'))
            navigate('https://etherscan.io/block/' + record.blockNumber, true);
          else navigate('https://etherscan.io/tx/' + action.record_id, true);
          break;
        case 'download':
          const exportFields = action.columns.filter((column) => {
            return column.download;
          });
          // const str = new Date().toISOString();
          const filename = accounts.meta.accountedFor.name; // g_focusValue + '_' + str.replace(/[ -.T]/g, '_').replace(/Z/, '');
          downloadData('CSV', exportFields, action.data, filename, exportValue, zeroFunc);
          break;
        // EXISTING_CODE
        default:
          break;
      }
    },
    [filtered, statusDispatch, debug, mocked, detailLevel]
  );

  useEffect(() => {
    let partialFetch = false;
    // EXISTING_CODE
    partialFetch = true;
    if (partialFetch) {
      if (mocked) {
        refreshAccountsData(dataQuery, dispatch, mocked);
      } else {
        if (recordCount > 0) {
          const max_records = stateFromStorage('perPage', 15); // start with five pages, double each time
          refreshAccountsData2(dataQuery, dispatch, 0, max_records, recordCount);
        }
      }
    }
    // EXISTING_CODE
    if (!partialFetch) {
      refreshAccountsData(dataQuery, dispatch, mocked);
    }
  }, [dataQuery, dispatch, mocked, recordCount]);

  useEffect(() => {
    Mousetrap.bind('plus', (e) => handleClick(e, accountsHandler, { type: 'Add' }));
    Mousetrap.bind('ctrl+d', (e) => handleClick(e, accountsHandler, { type: 'toggle-detail' }));
    return () => {
      Mousetrap.unbind('plus');
      Mousetrap.unbind('ctrl+d');
    };
  }, [accountsHandler]);

  useMemo(() => {
    // prettier-ignore
    if (accounts && accounts.data) {
      setTagList(getTagList(accounts));
      const result = accounts.data.filter((item) => {
        // EXISTING_CODE
        const isAirdrop = (item['toName'] && item['toName'].name.includes('Airdrop')) || (item['fromName'] && item['fromName'].name.includes('Airdrop'))
        switch (curTag) {
          case 'Hide Airdrops':
            return !isAirdrop;
          case 'Show Airdrops':
              return isAirdrop;
          case 'Hide Outgoing':
            return item.from !== g_focusValue;
          case 'Grants':
            return (
              (item['toName'] && item['toName'].name.includes('Gitcoin')) ||
              (item['fromName'] && item['fromName'].name.includes('Gitcoin'))
            );
          case 'Eth':
            if (!item['statements']) return false;
            const statements = item['statements'][0];
            if (statements.amountIn !== '') return true;
            if (statements.internalIn !== '') return true;
            if (statements.selfDestructIn !== '') return true;
            if (statements.minerBaseRewardIn !== '') return true;
            if (statements.minerNephewRewardIn !== '') return true;
            if (statements.minerTxFeeIn !== '') return true;
            if (statements.minerUncleRewardIn !== '') return true;
            if (statements.prefundIn !== '') return true;
            if (statements.amountOut !== '') return true;
            if (statements.internalOut !== '') return true;
            if (statements.selfDestructOut !== '') return true;
            if (statements.gasCostOut !== '') return true;
            return false
          case 'Not Eth':
            if (!item['statements']) return false;
            const statements1 = item['statements'][0];
            if (statements1.amountIn !== '') return false;
            if (statements1.internalIn !== '') return false;
            if (statements1.selfDestructIn !== '') return false;
            if (statements1.minerBaseRewardIn !== '') return true;
            if (statements1.minerNephewRewardIn !== '') return true;
            if (statements1.minerTxFeeIn !== '') return true;
            if (statements1.minerUncleRewardIn !== '') return true;
            if (statements1.prefundIn !== '') return false;
            if (statements1.amountOut !== '') return false;
            if (statements1.internalOut !== '') return false;
            if (statements1.selfDestructOut !== '') return false;
            if (statements1.gasCostOut !== '') return false;
            return true;
          case 'Tokens':
            if (!item['articulatedTx']) return false;
            if (!item['articulatedTx'].name)  return false
            const art = item['articulatedTx'].name.toLowerCase();
            return art.includes('mint') || art === 'transfer' || art === 'approve' || art === 'transferfrom';
          case 'Reconciled':
            if (!item['statements']) return false;
            if (item.statements.length === 0) return false;
            return (item.statements[0]['reconciled'] && (item.statements[0]['reconciliationType'] === '' || item.statements[0]['reconciliationType'].includes('partial')));
          case 'Unreconciled':
            if (!item['statements']) return false;
            if (item.statements.length === 0) return false;
            return (!item.statements[0]['reconciled']);
          case 'SelfDestructs':
            if (!item['statements']) return false;
            if (item.statements.length === 0) return false;
            return (item.statements[0]['selfDestructIn'] > 0 || item.statements[0]['selfDestructOut'] > 0);
          case 'Creations':
            if (!item['receipt']) return false;
            if (!item.receipt['logs']) return false;
            return (item.receipt['contractAddress'] !== '' && item.receipt['contractAddress'] !== '0x0');
          case 'Messages':
            if (!item['compressedTx']) return false;
            return item.compressedTx.substr(0,8).includes('message:');
          case 'Functions':
            if (!item['compressedTx']) return true;
            return !item.compressedTx.substr(0,8).includes('message:');
          case 'Neighbors':
            return false;
          case 'Events':
          case 'Balances':
          case 'All':
          default:
            return true;
        }
        // EXISTING_CODE
        return curTag === 'All' || (item.tags && item.tags.includes(curTag));
      });
      setFiltered(result);
    }
    statusDispatch(NOT_LOADING);
  }, [accounts, curTag, statusDispatch]);

  let custom = null;
  let title = 'Accounts';
  // EXISTING_CODE
  title = name
    ? decodeURIComponent(name.replace(/\+/g, '%20'))
    : addresses.value
    ? addresses.value.substr(0, 10) +
      '...' +
      addresses.value.substr(addresses.value.length - 6, addresses.value.length - 1)
    : 'No Name';
  g_Handler = accountsHandler;

  useMountEffect(() => {
    const qqq = 'count&addrs=' + addresses.value + '' + (mocked ? '&mockData' : '');
    getServerData(getApiUrl('export'), qqq).then((theData) => {
      if (mocked) {
        setRecordCount(100);
      } else if (theData && theData.data && theData.data.length > 0) {
        setRecordCount(theData.data[0].nRecords);
      } else {
        // an error or first time through?
        setRecordCount(0);
      }
    });
    Mousetrap.bind('plus', (e) => handleClick(e, accountsHandler, { type: 'Add' }));
    return () => {
      Mousetrap.unbind('plus');
    };
  });
  // EXISTING_CODE

  const table = getInnerTable(
    accounts,
    curTag,
    filtered,
    title,
    detailLevel,
    searchFields,
    recordIconList,
    accountsHandler
  );
  return (
    <div>
      {/* prettier-ignore */}
      <PageCaddie
        caddieName="Tags"
        caddieData={tagList}
        current={curTag}
        useProgress={true}
        handler={accountsHandler}
      />
      {mocked && (
        <span className='warning'>
          <b>&nbsp;&nbsp;MOCKED DATA&nbsp;&nbsp;</b>
        </span>
      )}
      {debug && <pre>{JSON.stringify(accounts, null, 2)}</pre>}
      {table}
      {/* prettier-ignore */}
      <Dialog showing={editDialog.showing} header={'Edit/Add Account'} handler={accountsHandler} object={editDialog.record} columns={accountsSchema}/>
      {custom}
    </div>
  );
};

//----------------------------------------------------------------------
const getTagList = (accounts) => {
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
const getInnerTable = (
  accounts,
  curTag,
  filtered,
  title,
  detailLevel,
  searchFields,
  recordIconList,
  accountsHandler
) => {
  // EXISTING_CODE
  if (!accounts) return <Fragment></Fragment>;
  if (curTag === 'Neighbors') {
    return <ObjectTable data={accounts.meta} columns={metaSchema} title={'Direct Neighbors of ' + title} />;
  } else if (curTag === 'Balances') {
    const test = accountsSchema;
    return <BalanceView data={filtered} columns={test} title={title} />;
  } else if (curTag === 'Functions') {
    const functionCallData = filtered.map((item) => {
      const parts = item.compressedTx.replace(/\)/, '').split('(');
      return { date: item.date, to: item.to, functionName: <b>{parts[0]}</b>, parameters: parts[1] };
    });
    return (
      <DataTable
        data={functionCallData}
        columns={functionCallSchema}
        title={'Functions Called by ' + title}
        search={true}
        searchFields={searchFields}
        pagination={true}
        parentHandler={accountsHandler}
      />
    );
  } else if (curTag === 'Messages') {
    const messageData = filtered.map((item) => {
      return {
        date: item.date,
        to: item.to,
        from: item.from,
        message: <b>{item.compressedTx.replace('message:', '')}</b>,
      };
    });
    return <DataTable data={messageData} columns={messagesSchema} title={'Functions Called by ' + title} />;
  }
  // EXISTING_CODE
  return (
    <SidebarTable
      tableName={'accountsTable'}
      data={filtered}
      columns={accountsSchema}
      title={title}
      searchFields={searchFields}
      recordIcons={recordIconList}
      parentHandler={accountsHandler}
      detailLevel={detailLevel}
    />
  );
};

// EXISTING_CODE
//----------------------------------------------------------------------
const BalanceView = ({ data, columns, title }) => {
  const cols = JSON.parse(JSON.stringify(columns));
  console.log('cols: ', cols);
  console.log('data: ', data);
  return (
    <ChartTable
      columns={cols}
      data={data}
      title=''
      search={false}
      chartName='accounts'
      chartCtx={{ type: 'line', defPair: ['blockNumber', 'statements.endBal'] }}
      pagination={true}
    />
  );
};

//----------------------------------------------------------------------
export function refreshAccountsData2(query, dispatch, firstRecord, maxRecords, nRecords) {
  getServerData(
    getApiUrl('export'),
    query + (maxRecords !== -1 ? '&first_record=' + firstRecord + '&max_records=' + maxRecords : '')
  ).then((theData) => {
    if (!theData.data || theData.data.length === 0) return;

    let meta = theData.meta;
    let accounts = theData.data;

    if (accounts && accounts.length > 0 && meta) {
      const named = accounts.map((item) => {
        item.fromName = meta.namedFrom && meta.namedFrom[item.from];
        item.toName = meta.namedTo && meta.namedTo[item.to];
        if (meta && meta.accountedFor && meta.accountedFor.name !== meta.accountedFor.address) {
          if (meta.accountedFor.address === item.from) item.fromName = meta.accountedFor;
          if (meta.accountedFor.address === item.to) item.toName = meta.accountedFor;
        }
        return item;
      });
      accounts = named;
    }
    theData.data = sortArray(accounts, defaultSort, ['asc', 'asc', 'asc']);
    dispatch({ type: 'success', payload: theData });

    if (Number(firstRecord) + Number(maxRecords) < nRecords) {
      var newStart = Number(firstRecord) + Number(maxRecords);
      var newEnd = maxRecords * 2;
      var max = 100;
      if (newStart + max < newEnd) newEnd = newStart + max;
      refreshAccountsData2(query, dispatch, newStart, newEnd, nRecords);
    }
  });
}
// EXISTING_CODE

// auto-generate: page-settings
const recordIconList = [
  'ExternalLink',
  'footer-QuickBooks',
  'footer-CSV',
  'footer-TXT',
  //
];
const defaultSort = ['blockNumber', 'transactionIndex'];
const defaultSearch = ['blockNumber', 'hash', 'from', 'fromName', 'to', 'toName', 'encoding', 'compressedTx'];
// auto-generate: page-settings

//----------------------------------------------------------------------
export function refreshAccountsData(query, dispatch, mocked) {
  getServerData(getApiUrl('export'), query + (mocked ? '&mockData' : '')).then((theData) => {
    let accounts = theData.data;
    // EXISTING_CODE
    // EXISTING_CODE
    theData.data = sortArray(accounts, defaultSort, ['asc', 'asc', 'asc']); // will return if array is null
    dispatch({ type: 'success', payload: theData });
  });
}

//----------------------------------------------------------------------
export const accountsDefault = [];

//----------------------------------------------------------------------
export const accountsReducer = (state, action) => {
  let accounts = state;
  switch (action.type.toLowerCase()) {
    case 'undelete':
    case 'delete':
      {
        const record = accounts.data.filter((r) => {
          const val = calcValue(r, { selector: 'id', onDisplay: getFieldValue });
          return val === action.record_id;
        })[0];
        if (record) {
          record.deleted = !record.deleted;
          accounts.data = replaceRecord(accounts.data, record, action.record_id, calcValue, getFieldValue);
        }
      }
      break;
    case 'success':
      // console.log('   ')
      // console.log('---------------------------------------------------------')
      // console.log('state: ', state);
      // console.log('payload: ', action.payload);
      let array = [];
      if (state.data) {
        array = state.data.map((item) => {
          return item;
        });
      }
      if (action.payload.data) {
        action.payload.data.map((item) => {
          array.push(item);
          return true;
        });
      }
      // console.log('array: ', array);
      action.payload.data = array;
      // console.log('payload2: ', action.payload);
      accounts = action.payload;
      break;
    default:
      // do nothing
      break;
  }
  return accounts;
};

//----------------------------------------------------------------------
export const useAccounts = () => {
  return useContext(GlobalContext).accounts;
};

//----------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  // EXISTING_CODE
  switch (fieldName) {
    case 'namedFromAndTo':
    case 'unNamedFromAndTo':
    case 'namedFrom':
    case 'unNamedFrom':
    case 'namedTo':
    case 'unNamedTo':
      return <pre>{JSON.stringify(record[fieldName], null, 2)}</pre>;
    default:
      break;
  }

  if (fieldName && fieldName.includes('statements.')) {
    if (!record || !record.statements || !record.statements[0]) return '';
    let fn = fieldName.replace('statements.', '');
    if (fn === 'begBalDiff' && record.statements[0][fn] === 0) return '';
    if (fn === 'endBalDiff' && record.statements[0][fn] === 0) return '';
    if (fn === 'reconciled') {
      return getIcon(
        'reconciled',
        record.statements[0][fn]
          ? record.statements[0]['reconciliationType'] === ''
            ? 'CheckCircle'
            : 'CheckCircleYellow'
          : 'XCircle'
      );
    } else if (fn === 'totalIn') {
      let value =
        Number(record.statements[0]['amountIn']) +
        Number(record.statements[0]['internalIn']) +
        Number(record.statements[0]['selfDestructIn']) +
        Number(record.statements[0]['minerBaseRewardIn']) +
        Number(record.statements[0]['minerNephewRewardIn']) +
        Number(record.statements[0]['minerTxFeeIn']) +
        Number(record.statements[0]['minerUncleRewardIn']) +
        Number(record.statements[0]['prefundIn']);
      return formatFieldByType('double', value, 7);
    } else if (fn === 'totalOut') {
      let value =
        Number(record.statements[0]['amountOut']) +
        Number(record.statements[0]['internalOut']) +
        Number(record.statements[0]['selfDestructOut']) +
        Number(record.statements[0]['gasCostOut']);
      return formatFieldByType('double', value, 7);
    }
    return record.statements[0][fn];
  }

  const internal = record.from !== g_focusValue && record.to !== g_focusValue;
  const is20 = record.hasToken || (record.toName && record.toName.is_erc20);
  const isAir =
    (record["toName"] && record["toName"].name.includes("Airdrop")) ||
    (record["fromName"] && record["fromName"].name.includes("Airdrop"));

  switch (fieldName) {
    case 'id':
      return record.hash;
    case 'separator4':
      return record.detailLevel === 2 ? 'All Events' : record.name;
    case 'marker':
      return <Fragment>{record.blockNumber + '.' + record.transactionIndex}</Fragment>;
    case 'marker2':
      return (
        <Fragment>
          {internal ? <div className="internal">{"in"}</div> : ""}
          {record.isError ? <div className="isError">{"er"}</div> : ""}
          {is20 ? <div className="is20">{"tok"}</div> : ""}
          {isAir ? <div className="isAir">{"a"}</div> : ""}
        </Fragment>
      );
    case 'isError':
      return record.isError ? 'error' : '';
    case 'internal':
      return internal ? 'int' : '';
    case 'from': {
      const val = record.fromName ? record.fromName.name : record.from;
      if (record.from === g_focusValue) return <div className='focusValue'>{val}</div>;
      return <div className='nonFocusValue'>{val}</div>;
    }
    case 'to': {
      const val = record.toName ? record.toName.name : record.to;
      if (record.to === g_focusValue) return <div className='focusValue'>{val}</div>;
      return <div className='nonFocusValue'>{val}</div>;
    }
    case 'fromName':
      return record.fromName ? (
        record.from
      ) : (
        <div
          onClick={(e) => handleClick(e, g_Handler, { type: 'Add', record_id: record.from })}
          style={{ color: 'green' }}>
          {getIcon(record.from, 'AddName', false, false, 12)}
        </div>
      );
    case 'toName':
      return record.toName ? (
        record.to
      ) : (
        <div
          onClick={(e) => handleClick(e, g_Handler, { type: 'Add', record_id: record.to })}
          style={{ color: 'green' }}>
          {getIcon(record.to, 'AddName', false, false, 12)}
        </div>
      );
    case 'creations':
      if (!record['receipt']) return '';
      if (!record.receipt['contractAddress']) return '';
      if (record.receipt.contractAddress === '0x0') return '';
      return record.receipt.contractAddress;
    case 'compressedLog':
      return <CompressedLogs record={record} />;
    case 'compressedTx':
      return <CompressedTx record={record} />;
    default:
      break;
  }
  // EXISTING_CODE
  return record[fieldName];
}

// EXISTING_CODE
//----------------------------------------------------------------------------
export function getExportValue(record, fieldName) {
  /*
Date,Amount,Payee,Description,Reference
2019/09/03,-15.00,"PNC Bank","Service Charge",""
2019/09/03,-20.00,"Intuit Pymt Soln","Corporate ACH Act Fee",""
2019/09/06,-1038.03,"Capital One","Card payment",""
           */
  if (!record) return '';
  const field = fieldName.replace('accounting.', '');
  switch (field) {
    case 'date':
      if (record.date) {
        let val = record.date.split(' ')[0].split('-');
        return val.join('/');
      }
      break;
    case 'amount':
      return getFieldValue(record, 'statements.amountNet');
    case 'payee':
      const ret = getFieldValue(record, 'statements.amountNet');
      return ret > 0 ? record.from : record.to;
    case 'description':
      if (!record.compressedTx) return '';
      return record.compressedTx.replace(/[{()} ,:]/g, '_');
    case 'reference':
      return record.hash;
    default:
      return getFieldValue(record, field);
  }
  return record[fieldName];
}

//----------------------------------------------------------------------
export const CompressedLogs = ({ record }) => {
  if (!record.receipt || !record.receipt.logs || record.receipt.logs.length === 0)
    return <div key={'yyy'}>{<i>{'no events'}</i>}</div>;
  const logs = record.receipt.logs.map((l) => {
    return l;
  });
  const theList = logs.map((log) => {
    const emitter = log.address;
    return displayCompressed(emitter, log.compressedLog.replace(/ /g, ''), false);
  });
  return <Fragment>{theList}</Fragment>;
};

//----------------------------------------------------------------------
export const CompressedTx = ({ record, fieldName }) => {
  if (!record['compressedTx']) return null;
  const compressed = record['compressedTx'];
  return displayCompressed('', compressed.replace(/ /g, ''), false);
};

//----------------------------------------------------------------------
function displayCompressed(emitter, compressed, debug) {
  if (compressed === '0x()') return <div key={'xxx'}>{<i>{'null'}</i>}</div>;

  if (compressed.substr(0, 8) === 'message:') {
    return (
      <div key={'xxx'}>
        <b>{compressed.replace('message:', '')}</b>
      </div>
    );
  }
  
  let arr = compressed.replace(')', '').replace('(', ',').split(',');
  if (arr.length === 0 || (arr.length === 1 && arr[0] === '')) return null;

  if (debug) console.log('array: ', arr);
  return (
    <div>
      {arr.map((item, index) => {
        if (index === 0) {
          return (
            <div key={item}>
              {
                <b>
                  {item}{emitter !== '' ? ': ' : '' }{emitter}
                </b>
              }
            </div>
          );
        } else {
          let s = item.split(':');
          if (!s) {
            s[0] = s[1] = '';
          } else if (!s[1]) {
            s[1] = '';
          }
          s[1] = s[1].trim();
          const ofInterest = s[1].includes(g_focusValue);
          return (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 20fr 80fr 1fr',
                }}>
                <div> </div>
                <div key={item + '_a'} style={{ fontStyle: 'italic' }}>
                  {s[0] === ' stub' ? '0x' : s[0] + ':'}
                </div>
                <div className={ofInterest ? 'focusValue' : ''} key={item + '_b'}>
                  {s[1]}
                </div>
                <div> </div>
              </div>
            </>
          );
        }
      })}
    </div>
  );
}

//----------------------------------------------------------------------
export const metaSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    hidden: true,
  },
  {
    selector: 'unNamedTo',
    onDisplay: getFieldValue,
  },
  {
    selector: 'namedTo',
    onDisplay: getFieldValue,
  },
  {
    selector: 'unNamedFrom',
    onDisplay: getFieldValue,
  },
  {
    selector: 'namedFrom',
    onDisplay: getFieldValue,
  },
  {
    selector: 'unNamedFromAndTo',
    onDisplay: getFieldValue,
  },
  {
    selector: 'namedFromAndTo',
    onDisplay: getFieldValue,
  },
];

//----------------------------------------------------------------------
export const functionCallSchema = [
  { selector: 'id', hidden: true },
  { selector: 'date', width: 7 },
  { selector: 'to', width: 12 },
  { selector: 'functionName', width: 10 },
  { selector: 'parameters', width: 40 },
];

//----------------------------------------------------------------------
export const messagesSchema = [
  { selector: 'id', hidden: true },
  { selector: 'date', width: 7 },
  { selector: 'to', width: 14 },
  { selector: 'from', width: 14 },
  { selector: 'message', width: 40 },
];

//----------------------------------------------------------------------
function zeroFunc(record) {
  return getFieldValue(record, 'statements.amountNet') === 0;
}
// EXISTING_CODE
