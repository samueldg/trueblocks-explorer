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
export const functionsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Type',
    selector: 'type',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Anonymous',
    selector: 'anonymous',
    type: 'bool',
    width: 1,
  },
  {
    name: 'Constant',
    selector: 'constant',
    type: 'bool',
    width: 1,
  },
  {
    name: 'Payable',
    selector: 'payable',
    type: 'bool',
    width: 1,
    searchable: true,
  },
  {
    name: 'Signature',
    selector: 'signature',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Encoding',
    selector: 'encoding',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Message',
    selector: 'message',
    type: 'string',
    width: 1,
  },
  {
    name: 'Inputs',
    selector: 'inputs',
    type: 'CParameterArray',
    width: 1,
  },
  {
    name: 'Outputs',
    selector: 'outputs',
    type: 'CParameterArray',
    width: 1,
  },
  {
    name: 'Address',
    selector: 'address',
    type: 'address',
    width: 1,
    searchable: true,
  },
];
// auto-generate: schema
  
