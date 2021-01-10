/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import { getFieldValue, useFieldValue } from 'pages/Names/Names';

//----------------------------------------------------------------------------
// auto-generate: schema
export const namesSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Tags',
    selector: 'tags',
    type: 'string',
    width: 3,
    editable: true,
    searchable: true,
  },
  {
    name: 'Address',
    selector: 'address',
    type: 'address',
    width: 6,
    editable: true,
    searchable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 4,
    editable: true,
    searchable: true,
  },
  {
    name: 'Symbol',
    selector: 'symbol',
    type: 'string',
    width: 2,
    editable: true,
    align: 'center',
    searchable: true,
  },
  {
    name: 'Source',
    selector: 'source',
    type: 'string',
    width: 4,
    editable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Decimals',
    selector: 'decimals',
    type: 'uint64',
    width: 2,
    editable: true,
    align: 'center',
  },
  {
    name: 'Description',
    selector: 'description',
    type: 'string',
    width: 4,
    editable: true,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'del',
    selector: 'deleted',
    type: 'bool',
  },
  {
    name: 'custom',
    selector: 'is_custom',
    type: 'bool',
  },
  {
    name: 'pre',
    selector: 'is_prefund',
    isPill: true,
    width: 1,
    type: 'bool',
  },
  {
    name: 'erc20',
    selector: 'is_erc20',
    isPill: true,
    width: 1,
    type: 'bool',
  },
  {
    name: 'erc721',
    selector: 'is_erc721',
    isPill: true,
    width: 1,
    type: 'bool',
  },
  {
    name: 'con',
    selector: 'is_contract',
    isPill: true,
    width: 1,
    type: 'bool',
  },
  {
    name: 'nAppearances',
    selector: 'nAppearances',
    type: 'blknum',
  },
  {
    name: 'Last Export',
    selector: 'lastExport',
    type: 'blknum',
  },
  {
    name: 'First Appearance',
    selector: 'firstAppearance',
    type: 'blknum',
  },
  {
    name: 'Latest Appearance',
    selector: 'latestAppearance',
    type: 'blknum',
  },
  {
    name: 'mon',
    selector: 'monitored',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
    onDisplay: useFieldValue,
  },
  {
    name: 'Path',
    selector: 'path',
    type: 'string',
  },
  {
    name: 'Size',
    selector: 'sizeInBytes',
    type: 'filesize',
  },
  {
    name: 'Icons',
    selector: 'icons',
    type: 'icons',
  },
];
// auto-generate: schema
