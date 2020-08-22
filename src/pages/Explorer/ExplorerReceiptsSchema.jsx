/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */

import { getFieldValue } from 'pages/Explorer/ExplorerReceipts'

//----------------------------------------------------------------------------
// auto-generate: schema
export const receiptsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
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
    name: 'Contract Address',
    selector: 'contractAddress',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Cumulative Gas',
    selector: 'cumulativeGasUsed',
    type: 'wei',
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
    name: 'Gas Used',
    selector: 'gasUsed',
    type: 'gas',
    width: 1,
    searchable: true,
  },
  {
    name: 'Logs',
    selector: 'logs',
    type: 'CLogEntryArray',
    width: 1,
  },
  {
    name: 'Logs Bloom',
    selector: 'logsBloom',
    type: 'string',
    width: 1,
  },
  {
    name: 'Root',
    selector: 'root',
    type: 'bytes32',
    width: 1,
  },
  {
    name: 'Status',
    selector: 'status',
    type: 'uint32',
    width: 1,
  },
  {
    name: 'To',
    selector: 'to',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Transaction Hash',
    selector: 'transactionHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'Transaction Index',
    selector: 'transactionIndex',
    type: 'blknum',
    width: 1,
  },
];
// auto-generate: schema
  
