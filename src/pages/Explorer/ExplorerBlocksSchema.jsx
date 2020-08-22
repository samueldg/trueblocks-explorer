/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */

import { getFieldValue } from 'pages/Explorer/ExplorerBlocks'

//----------------------------------------------------------------------------
// auto-generate: schema
export const blocksSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Block Number',
    selector: 'blockNumber',
    type: 'blknum',
    width: 1,
  },
  {
    name: 'Hash',
    selector: 'hash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'Parent Hash',
    selector: 'parentHash',
    type: 'hash',
    width: 1,
    searchable: true,
  },
  {
    name: 'Timestamp',
    selector: 'timestamp',
    type: 'timestamp',
    width: 1,
  },
  {
    name: 'Transactions',
    selector: 'transactions',
    type: 'CTransactionArray',
    width: 1,
    align: 'wordwrap',
  },
  {
    name: 'Difficulty',
    selector: 'difficulty',
    type: 'uint64',
    width: 1,
  },
  {
    name: 'Miner',
    selector: 'miner',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Gas Limit',
    selector: 'gasLimit',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Gas Used',
    selector: 'gasUsed',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Finalized',
    selector: 'finalized',
    type: 'bool',
    width: 1,
  },
  {
    name: 'Price',
    selector: 'price',
    type: 'double',
    width: 1,
    decimals: 2,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Light',
    selector: 'light',
    type: 'bool',
    width: 1,
  },
];
// auto-generate: schema
  
