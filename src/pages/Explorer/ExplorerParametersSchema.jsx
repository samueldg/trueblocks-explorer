/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
function getFieldValue(record, fieldName) {
  switch (fieldName) {
    case 'id':
      return record.blockNumber + '-' + record.transactionIndex;
    default:
      break;
  }
}

// auto-generate: schema
export const parametersSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Type',
    selector: 'type',
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
    name: 'Str Default',
    selector: 'str_default',
    type: 'string',
    width: 1,
  },
  {
    name: 'Value',
    selector: 'value',
    type: 'string',
    width: 1,
  },
  {
    name: 'Indexed',
    selector: 'indexed',
    type: 'bool',
    width: 1,
  },
  {
    name: 'No Write',
    selector: 'no_write',
    type: 'bool',
    width: 1,
  },
  {
    name: 'isFlags',
    selector: 'is_flags',
    type: 'uint64',
    width: 1,
  },
];
// auto-generate: schema
  
