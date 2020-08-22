/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */

import { getFieldValue } from 'pages/Explorer/ExplorerTraces'

//----------------------------------------------------------------------------
// auto-generate: schema
export const tracesSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'blockHash',
    selector: 'blockHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'blockNumber',
    selector: 'blockNumber',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'subtraces',
    selector: 'subtraces',
    type: 'uint64',
    width: 1,
  },
  {
    name: 'traceAddress',
    selector: 'traceAddress',
    type: 'CStringArray',
    width: 1,
    searchable: true,
  },
  {
    name: 'transactionHash',
    selector: 'transactionHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'transactionIndex',
    selector: 'transactionIndex',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'type',
    selector: 'type',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'error',
    selector: 'error',
    type: 'string',
    width: 1,
  },
  {
    name: 'articulatedTrace',
    selector: 'articulatedTrace',
    type: 'CFunction',
    width: 1,
    searchable: true,
  },
  {
    name: 'compressedTrace',
    selector: 'compressedTrace',
    type: 'string',
    width: 1,
  },
  {
    name: 'action',
    selector: 'action',
    type: 'CTraceAction',
    width: 1,
  },
  {
    name: 'result',
    selector: 'result',
    type: 'CTraceResult',
    width: 1,
  },
];
// auto-generate: schema
  
