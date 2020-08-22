/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import { getFieldValue } from 'pages/Settings/SettingsSystems';

//----------------------------------------------------------------------------
// auto-generate: schema
export const systemsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Status',
    selector: 'status',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Subsystem',
    selector: 'which',
    type: 'string',
    width: 1,
  },
  {
    name: 'Description',
    selector: 'descr',
    type: 'string',
    align: 'wordwrap',
    searchable: true,
  },
  {
    name: 'API Provider',
    selector: 'apiProvider',
    type: 'string',
    width: 1,
    editable: true,
  },
  {
    name: 'Host',
    selector: 'host',
    type: 'string',
  },
  {
    name: 'Host Env',
    selector: 'environ',
    type: 'string',
    width: 1,
  },
  {
    name: 'RPC Provider',
    selector: 'rpcProvider',
    type: 'string',
    width: 1,
    editable: true,
  },
  {
    name: 'Trace Provider',
    selector: 'traceProvider',
    type: 'string',
    editable: true,
  },
  {
    name: 'Balance Provider',
    selector: 'balanceProvider',
    type: 'string',
    editable: true,
  },
  {
    name: 'Cache Path',
    selector: 'cachePath',
    type: 'string',
  },
  {
    name: 'Index Path',
    selector: 'indexPath',
    type: 'string',
  },
  {
    name: 'Version',
    selector: 'version',
    type: 'string',
  },
];
// auto-generate: schema
  
