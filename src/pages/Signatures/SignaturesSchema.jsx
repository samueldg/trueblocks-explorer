/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/*
 * This file was generated with makeClass. Edit only those parts of the code inside
 * of 'EXISTING_CODE' tags.
 */
import { getFieldValue } from 'pages/Signatures/Signatures';

//----------------------------------------------------------------------------
// auto-generate: schema
export const signaturesSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Encoding',
    selector: 'encoding',
    type: 'hash',
    width: 1,
    editable: true,
    searchable: true,
  },
  {
    name: 'Type',
    selector: 'type',
    type: 'string',
    width: 1,
    editable: true,
    isPill: true,
    searchable: true,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 2,
    editable: true,
    searchable: true,
  },
  {
    name: 'Signature',
    selector: 'signature',
    type: 'string',
    editable: true,
  },
  {
    name: 'Input Names',
    selector: 'inputs',
    type: 'string',
    editable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Output Names',
    selector: 'outputs',
    type: 'string',
    editable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Signature',
    selector: 'function',
    type: 'string',
    width: 6,
    editable: true,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Icons',
    selector: 'icons',
    type: 'icons',
  },
];
// auto-generate: schema
  
