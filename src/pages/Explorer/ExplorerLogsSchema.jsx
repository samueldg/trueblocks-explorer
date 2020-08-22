/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */

import { getFieldValue } from 'pages/Explorer/ExplorerLogs'

//----------------------------------------------------------------------------
// auto-generate: schema
export const logsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Address',
    selector: 'address',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Block Hash',
    selector: 'blockHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'Block Number',
    selector: 'blockNumber',
    type: 'blknum',
    width: 1,
    searchable: true,
  },
  {
    name: 'Data',
    selector: 'data',
    type: 'string',
    width: 1,
  },
  {
    name: 'Log Index',
    selector: 'logIndex',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'Removed',
    selector: 'removed',
    type: 'bool',
    width: 1,
  },
  {
    name: 'Topics',
    selector: 'topics',
    type: 'CTopicArray',
    width: 1,
    searchable: true,
  },
  {
    name: 'Articulated Log',
    selector: 'articulatedLog',
    type: 'CFunction',
    width: 1,
    searchable: true,
  },
  {
    name: 'Compressed Log',
    selector: 'compressedLog',
    type: 'string',
    width: 1,
  },
  {
    name: 'Transaction Hash',
    selector: 'transactionHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'Tx Index',
    selector: 'transactionIndex',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'Tx Log Index',
    selector: 'transactionLogIndex',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'Type',
    selector: 'type',
    type: 'string',
    width: 1,
    searchable: true,
  },
];
// auto-generate: schema
  
