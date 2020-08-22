/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import { getFieldValue, getExportValue } from 'pages/Monitors/Monitors';

//----------------------------------------------------------------------------
// auto-generate: schema
export const monitorsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
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
    searchable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 7,
    editable: true,
    searchable: true,
  },
  {
    name: 'Symbol',
    selector: 'symbol',
    type: 'string',
    editable: true,
    align: 'center',
    searchable: true,
  },
  {
    name: 'Source',
    selector: 'source',
    type: 'string',
    editable: true,
    searchable: true,
  },
  {
    name: 'Decimals',
    selector: 'decimals',
    type: 'uint64',
    align: 'center',
  },
  {
    name: 'Description',
    selector: 'description',
    type: 'string',
    editable: true,
    searchable: true,
  },
  {
    name: 'isCustom',
    selector: 'is_custom',
    type: 'bool',
  },
  {
    name: 'isPrefund',
    selector: 'is_prefund',
    type: 'bool',
  },
  {
    name: 'Count',
    selector: 'nAppearances',
    type: 'blknum',
    width: 2,
  },
  {
    name: 'Last Export',
    selector: 'lastExport',
    type: 'blknum',
  },
  {
    name: 'First Block',
    selector: 'firstAppearance',
    type: 'blknum',
    width: 2,
  },
  {
    name: 'Last Block',
    selector: 'latestAppearance',
    type: 'blknum',
    width: 2,
  },
  {
    name: 'Path',
    selector: 'path',
    type: 'string',
  },
  {
    name: 'Monitor Size',
    selector: 'sizeInBytes',
    type: 'filesize',
    width: 2,
  },
  {
    name: 'Tx Cache Size',
    selector: 'sizeInBytes2',
    type: 'filesize',
    width: 2,
  },
  {
    name: 'Deleted',
    selector: 'deleted',
    type: 'bool',
  },
  {
    name: 'ACCNT',
    selector: 'accounting.accnt',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'NAME',
    selector: 'accounting.name',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'REFNUM',
    selector: 'accounting.refnum',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'TIMESTAMP',
    selector: 'accounting.timestamp',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'ACCNTTYPE',
    selector: 'accounting.accnttype',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'OBAMOUNT',
    selector: 'accounting.obamount',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'DESC',
    selector: 'accounting.desc',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'ACCNUM',
    selector: 'accounting.accum',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'SCD',
    selector: 'accounting.scd',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'EXTRA',
    selector: 'accounting.extra',
    type: 'string',
    onDisplay: getExportValue,
  },
  {
    name: 'Icons',
    selector: 'icons',
    type: 'icons',
  },
];
// auto-generate: schema
