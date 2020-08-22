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

export const settingsSchema = [{ name: 'Id', selector: 'id' }];

//------------------------------------------------------------------------------
// auto-generate: schema
export const schemasSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    onDisplay: getFieldValue,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 1,
  },
  {
    name: 'Selector',
    selector: 'selector',
    type: 'string',
    width: 1,
  },
  {
    name: 'Type',
    selector: 'type',
    type: 'string',
    width: 1,
  },
  {
    name: 'Width',
    selector: 'width',
    type: 'uint64',
    width: 1,
    align: 'center',
  },
  {
    name: 'Class Name',
    selector: 'cn',
    type: 'string',
    width: 1,
    align: 'center',
  },
  {
    name: 'Alignment',
    selector: 'align',
    type: 'string',
    width: 1,
    align: 'center',
  },
  {
    name: 'Decimals',
    selector: 'decimals',
    type: 'uint64',
    width: 1,
    align: 'center',
  },
  {
    name: 'Editable',
    selector: 'editable',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'Hidden',
    selector: 'hidden',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'Detail',
    selector: 'detail',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'HideEmpty',
    selector: 'hide_empty',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'isPill',
    selector: 'isPill',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'Download',
    selector: 'download',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'Sortable',
    selector: 'sortable',
    type: 'bool',
    width: 1,
    isPill: true,
    align: 'center',
  },
  {
    name: 'Chart',
    selector: 'chart',
    type: 'string',
    width: 1,
    align: 'center',
  },
  {
    name: 'underField',
    selector: 'underField',
    type: 'string',
    width: 1,
  },
  {
    name: 'onDisplay',
    selector: 'onDisplay',
    type: 'function',
    width: 1,
  },
  {
    name: 'onAccept',
    selector: 'onAccept',
    type: 'function',
    width: 1,
  },
  {
    name: 'onValidate',
    selector: 'onValidate',
    type: 'function',
    width: 1,
  },
];
// auto-generate: schema
