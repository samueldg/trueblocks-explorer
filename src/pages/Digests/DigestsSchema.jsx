/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import { getFieldValue } from 'pages/Digests/Digests';

//----------------------------------------------------------------------------
// auto-generate: schema
export const digestsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    searchable: true,
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Cache Type',
    selector: 'type',
    type: 'string',
    detail: 2,
  },
  {
    name: 'Block Range',
    selector: 'blockRange',
    type: 'string',
    align: 'center',
    chart: 'both',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'Block Span',
    selector: 'blockSpan',
    type: 'uint64',
    width: 1,
    chart: 'both',
    onDisplay: getFieldValue,
  },
  {
    name: 'Duration',
    selector: 'duration',
    type: 'uint64',
    width: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Seconds',
    selector: 'seconds',
    type: 'uint64',
    chart: 'both',
    detail: 2,
    onDisplay: getFieldValue,
  },
  {
    name: 'First Block',
    selector: 'firstAppearance',
    type: 'blknum',
    width: 1,
    chart: 'both',
    detail: 2,
  },
  {
    name: 'Latest Block',
    selector: 'latestAppearance',
    type: 'blknum',
    width: 1,
    detail: 2,
  },
  {
    name: 'nAddrs',
    selector: 'nAddresses',
    type: 'uint64',
    width: 1,
    chart: 'both',
  },
  {
    name: 'nApps',
    selector: 'nAppearances',
    type: 'uint64',
    width: 1,
    cn: 'apps',
    chart: 'both',
  },
  {
    name: 'nAddrs/nBlock',
    selector: 'addrsPerBlock',
    type: 'double',
    width: 1,
    decimals: 5,
    chart: 'both',
    onDisplay: getFieldValue,
  },
  {
    name: 'nApps/nBlock',
    selector: 'appsPerBlock',
    type: 'double',
    width: 1,
    decimals: 5,
    chart: 'both',
    onDisplay: getFieldValue,
  },
  {
    name: 'nApps/nAddress',
    selector: 'appsPerAddr',
    type: 'double',
    width: 1,
    decimals: 5,
    chart: 'both',
    onDisplay: getFieldValue,
  },
  {
    name: 'First TS',
    selector: 'firstTs',
    type: 'timestamp',
    chart: 'both',
    detail: 2,
  },
  {
    name: 'Latest TS',
    selector: 'latestTs',
    type: 'timestamp',
    detail: 2,
  },
  {
    name: 'Filename',
    selector: 'filename',
    type: 'string',
    searchable: true,
    detail: 2,
  },
  {
    name: 'Chunk Size',
    selector: 'indexSizeBytes',
    type: 'filesize',
    width: 1,
    chart: 'both',
  },
  {
    name: 'Bloom Size',
    selector: 'bloomSizeBytes',
    type: 'filesize',
    width: 1,
    chart: 'both',
  },
  {
    name: 'Bloom Hash',
    selector: 'bloom_hash',
    type: 'hash',
    width: 1,
    align: 'center',
    cn: 'hashes',
    searchable: true,
  },
  {
    name: 'Chunk Hash',
    selector: 'index_hash',
    type: 'hash',
    width: 1,
    align: 'center',
    cn: 'hashes',
    searchable: true,
  },
];
// auto-generate: schema
