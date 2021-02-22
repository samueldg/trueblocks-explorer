/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useEffect } from 'react';

import Mousetrap from 'mousetrap';

export function createClass(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if (!(style.sheet || {}).insertRule) (style.styleSheet || style.sheet).addRule(name, rules);
  else style.sheet.insertRule(name + '{' + rules + '}', 0);
}

export const Spacer = ({ cols = 1 }) => {
  const wids = Array(cols)
    .fill()
    .map(() => '1fr')
    .join(' ');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: { wids },
      }}>
      <br />
    </div>
  );
};

/**
 *
 * stateFromStorage
 * retreive from local storage with a default
 *
 * @param {key} the key to retreive from local storage
 * @param {defaultState} the value to return if key is not in local storage
 */
export const stateFromStorage = (key, defaultState, asString = false) => {
  const storage = localStorage.getItem(key);
  if (storage === null) return defaultState;
  if (asString) return storage;
  return JSON.parse(storage);
};

//----------------------------------------------------------------------
export const handleClick = (e, dispatch, action = {}) => {
  if (e) e.preventDefault();
  if (dispatch) dispatch(action);
};

//----------------------------------------------------------------------
export const fetchFromServer = (url, onSuccess, onFail) => {
  fetch(url)
    .then((res) => {
      if (res.status !== 200) throw new Error('fetch to ' + url + ' failed.');
      return res.text();
    })
    .then((txt) => {
      if (onSuccess) onSuccess(txt);
    })
    .catch((err) => {
      if (onFail) {
        onFail(err.name + ': ' + err.message);
      }
    });
};

//----------------------------------------------------------------------------
export function navigate(href, newTab) {
  var a = document.createElement('a');
  a.href = href;
  if (newTab) {
    a.setAttribute('target', '_blank');
  }
  a.click();
}

//----------------------------------------------------------------------------
export const replaceRecord = (array, record, id, calc, get) => {
  var ret = array.map((item) => {
    if (calc(item, { selector: 'id', onDisplay: get }) === id) return record;
    return item;
  });
  return ret;
};

//----------------------------------------------------------------------------
export async function getServerData(route, query) {
  const url = route + '?' + query;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//----------------------------------------------------------------------------
export async function sendServerCommand(route, query) {
  const url = route + '?' + query;
  await fetch(url);
}

//----------------------------------------------------------------------------
export const notEmpty = (fieldName, value) => {
  return value === '' ? 'field may not be empty' : '';
};

//----------------------------------------------------------------------
export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

//----------------------------------------------------------------------
export const currentPage = () => {
  const electronIndexLoaded = [/^file:\/\//, /index.html/].every((regexp) => regexp.test(window.location));

  if (electronIndexLoaded) {
    return { page: 'entities', subpage: '', params: {} };
  }

  const parts = window.location.pathname.split('/');
  const query = window.location.search.substr(1).split('&');
  const params = query.map((item) => {
    const p = item.split('=');
    return { name: p[0], value: p[1] };
  });
  if (parts.length < 2 || parts[1] === '') parts[1] = 'entities';
  if (parts.length < 3) parts[2] = '';
  return { page: parts[1], subpage: parts[2], params: params };
};

//----------------------------------------------------------------------------
export const sortArray = (array, fArray, dArray) => {
  if (fArray.size === 0) return array;
  if (!array || array.size === 0) return array;
  array.sort(function (a, b) {
    for (var index = 0; index < fArray.length; index++) {
      let aVal = a[fArray[index]];
      let bVal = b[fArray[index]];
      let result = (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * (dArray[index] ? 1 : -1);
      if (result) return result;
    }
    return 0;
  });
  return array;
};

//----------------------------------------------------------------------------
export const sortStrings = (array, dir) => {
  if (!array || array.size === 0) return array;
  array.sort(function (aVal, bVal) {
    return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * (dir ? 1 : -1);
  });
  return array;
};

//-----------------------------------------------------------------
export function calcValue(record, column) {
  if (!column) return '';
  if (column.onDisplay) return column.onDisplay(record, column.selector);
  if (!record || record === undefined) return '';
  return record[column.selector];
}

//-----------------------------------------------------------------
export function exportValue(record, column) {
  if (!column) return '';
  if (!record[column.selector] || record[column.selector] === '') return calcValue(record, column);
  return record[column.selector];
}

//---------------------------------------------------------------
export const formatFieldByType = (type, value, decimals = 0) => {
  if (type[0] === 'C') return JSON.stringify(value, null, 2);
  switch (type) {
    case 'spacer':
      value = '';
      break;
    case 'function':
      if (typeof value === 'function') value = JSON.stringify(value, null, 2);
      break;
    case 'object':
      if (typeof value === 'object') value = JSON.stringify(value, null, 2);
      break;
    case 'array':
      value = JSON.stringify(value);
      break;
    case 'bool':
      value = value ? 'true' : 'false';
      break;
    case 'filesize':
      value = humanFileSize(value, true);
      break;
    case 'uint32':
    case 'uint64':
    case 'double':
      const isZero = value === '0' || value === 0;
      value = isZero ? '-' : fmtNum(value, decimals, decimals === 0 ? '' : ' ');
      break;
    case 'hash':
      if (!value) return value;
      if (value.length === 10) return value;
      value = value ? value.substr(0, 8) + '...' + value.substr(value.length - 6, value.length - 1) : '';
      break;
    case 'gas':
    case 'wei':
    case 'ether':
    case 'value':
    case 'address':
    case 'timestamp':
    case 'string':
    case 'bytes32':
    case 'blknum':
    default:
      break;
  }
  //console.log('out: ', type, value);
  return value;
};

//----------------------------------------------------------------------------
const humanFileSize = (numInBytes) => {
  numInBytes = fmtNum(numInBytes).split('.')[0].replace(/[,.]/g, ''); // clean it
  if (numInBytes === 0) return '0 B';
  // return numInBytes;
  const si = true;
  var thresh = si ? 1000 : 1024;
  if (Math.abs(numInBytes) < thresh) {
    return numInBytes + ' bytes';
  }
  var units = si
    ? ['kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    numInBytes /= thresh;
    ++u;
  } while (Math.abs(numInBytes) >= thresh && u < units.length - 1);
  return numInBytes.toFixed(2) + ' ' + units[u];
};

//----------------------------------------------------------------------------
export const fmtNum = (n, dd = 0, type = '', delim = ',', dec = '.') => {
  if (n === 0) return '0';
  if (!n) return '';
  const number = type === '' ? n.toString() : n.toFixed ? n.toFixed(dd) : n.toString();
  const prefix = type === '' ? '' : type === '$' ? type + ' ' : '';
  const postfx = type === '' ? '' : type === '$' ? '' : ' ' + type;

  let ret = number.replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + delim);
  if (!ret.includes(dec)) return prefix + ret + postfx;

  const parts = ret.split(dec);
  parts[1] = dec === '.' ? parts[1].replace(/,/g, '') : parts[1].replace(/\./g, '');
  ret = parts[0] + dec + parts[1];
  return prefix + ret + postfx;
};

/*
TESTING
  const check = (n, expected) => {
    return (
      <div style={{ width: '60%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>{n}</div>
        <div className={n === expected ? "" : "warning"}>{expected}</div>
      </div>
    );
  }

  <div style={{ margin: '200px', fontSize: '1em' }}>
    {check(fmtNum(0), "0")}
    {check(fmtNum(2665), "2,665")}
    {check(fmtNum(-102665), "-102,665")}
    {check(fmtNum(111102665), "111,102,665")}
    {check(fmtNum(1240.52345), "1,240.52345")}
    {check(fmtNum(1000240.5121909812), "1,000,240.5121909812")}
    {check(fmtNum("100100"), "100,100")}
    {check(fmtNum(1000000000000001), "1,000,000,000,000,001")}
    {check(fmtNum(10000000000000001), "10,000,000,000,000,001")}
    {check(fmtNum(100000000000000001), "100,000,000,000,000,001")}
    {check(fmtNum(1000000000000000001), "1,000,000,000,000,000,001")}
    {check(fmtNum(2665, 0, '$'), "$ 2,665")}
    {check(fmtNum(2665, 2, '$'), "$ 2,665.00")}
    {check(fmtNum(2665.0123, 0, '$'), "$ 2,665")}
    {check(fmtNum(102665, 5, '$'), "$ 102,665.00000")}
    {check(fmtNum(1234567.0123456789, 0, '€', '.', ','), "1.234.567 €")}
    {check(fmtNum(1234567, 2, '€', '.', ','), "1.234.567,00 €")}
    {check(fmtNum(1234567.0123456789, 2, '€', '.', ','), "1.234.567,01 €")}
    {check(fmtNum(1234567.0123456789, 6, '€', '.', ','), "1.234.567,012346 €")}
  </div>
*/

export const useArrowKeys = (handler, deps) => {
  useEffect(() => {
    Mousetrap.bind('home', (e) => handleClick(e, handler, { type: 'home' }));
    Mousetrap.bind('end', (e) => handleClick(e, handler, { type: 'end' }));
    Mousetrap.bind('up', (e) => handleClick(e, handler, { type: 'up' }));
    Mousetrap.bind('left', (e) => handleClick(e, handler, { type: 'left' }));
    Mousetrap.bind('down', (e) => handleClick(e, handler, { type: 'down' }));
    Mousetrap.bind('right', (e) => handleClick(e, handler, { type: 'right' }));
    Mousetrap.bind('pagedown', (e) => handleClick(e, handler, { type: 'pagedown' }));
    Mousetrap.bind('pageup', (e) => handleClick(e, handler, { type: 'pageup' }));
    Mousetrap.bind('del', (e) => handleClick(e, handler, { type: 'delete' }));
    Mousetrap.bind('shift+del', (e) => handleClick(e, handler, { type: 'remove' }));
    Mousetrap.bind('enter', (e) => handleClick(e, handler, { type: 'enter' }));
    Mousetrap.bind('shift+enter', (e) => handleClick(e, handler, { type: 'shift_enter' }));
    return () => {
      Mousetrap.unbind('home');
      Mousetrap.unbind('end');
      Mousetrap.unbind('up');
      Mousetrap.unbind('left');
      Mousetrap.unbind('down');
      Mousetrap.unbind('right');
      Mousetrap.unbind('pagedown');
      Mousetrap.unbind('pageup');
      Mousetrap.unbind('del');
      Mousetrap.unbind('shift+del');
      Mousetrap.unbind('enter');
      Mousetrap.unbind('shit+enter');
    };
  }, [handler, deps]);
};

//----------------------------------------------------------------------
export const dataFetcher = (url) =>
  fetch(url).then((r) => {
    return r.json();
  });

//-------------------------------------------------------------------------
export const downloadData = (format, exportFields, data, filename, exportFunc, zeroFunc = null) => {
  const isCSV = format === 'CSV';
  const isIIF = format === 'IIF';
  const delimiter = isCSV ? ',' : '\t';
  const outFmt = isCSV ? 'csv' : 'text';
  const preHeader = isIIF ? '!HDR	PROD	VER	REL	IIFVER	DATE	TIME\nHDR	TrueBlocks	Version 0.7.0.1234		1	7/1/20	1593644002\n' : '';
  const exportFileName = filename[0] === '/' ? filename : filename + (isCSV ? '.csv' : isIIF ? '.iif' : '.txt');

  const theHeader = exportFields
    .map((column) => {
      return !column.name ? column.selector : column.name;
    })
    .join(delimiter);

  const filtered = !zeroFunc ? data : data.filter((record) => !zeroFunc(record));
  const theRows = filtered.map((record, index) => {
    const row = exportFields.map((column) => {
      return exportFunc(record, column);
    });
    return row.join(delimiter);
  });

  const theOutput = preHeader + (isIIF ? '!' : '') + theHeader + '\n' + theRows.join('\n');

  var expElement = document.createElement('a');
  expElement.href = 'data:text/' + outFmt + ';charset=utf-8,' + encodeURI(theOutput);
  expElement.target = '_blank';
  expElement.download = exportFileName;
  expElement.click();
};
