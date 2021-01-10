/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */

import { getFieldValue } from 'pages/Explorer/ExplorerTransactions'

//----------------------------------------------------------------------------
// auto-generate: schema
export const transactionsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Hash',
    selector: 'hash',
    type: 'hash',
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
  },
  {
    name: 'Tx Index',
    selector: 'transactionIndex',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'Nonce',
    selector: 'nonce',
    type: 'uint64',
    width: 1,
  },
  {
    name: 'Timestamp',
    selector: 'timestamp',
    type: 'timestamp',
    width: 1,
  },
  {
    name: 'From',
    selector: 'from',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'To',
    selector: 'to',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Value',
    selector: 'value',
    type: 'wei',
    width: 1,
  },
  {
    name: 'Gas',
    selector: 'gas',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Gas Price',
    selector: 'gasPrice',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Input',
    selector: 'input',
    type: 'string',
    width: 1,
  },
  {
    name: 'isError',
    selector: 'isError',
    type: 'uint64',
    width: 1,
  },
  {
    name: 'hasToken',
    selector: 'hasToken',
    type: 'uint64',
    width: 1,
  },
  {
    name: 'Receipt',
    selector: 'receipt',
    type: 'CReceipt',
    width: 1,
  },
  {
    name: 'Articulated Tx',
    selector: 'articulatedTx',
    type: 'CFunction',
    width: 1,
    searchable: true,
  },
  {
    name: 'Compressed Tx',
    selector: 'compressedTx',
    type: 'string',
    width: 1,
  },
  {
    name: 'Finalized',
    selector: 'finalized',
    type: 'bool',
    width: 1,
  },
  {
    name: 'Traces',
    selector: 'traces',
    type: 'CTraceArray',
    width: 1,
  },
];
// auto-generate: schema
  
