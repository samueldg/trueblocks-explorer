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
export const traceActionsSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Address',
    selector: 'address',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Balance',
    selector: 'balance',
    type: 'wei',
    width: 1,
  },
  {
    name: 'Call Type',
    selector: 'callType',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'From',
    selector: 'from',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Gas',
    selector: 'gas',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Init',
    selector: 'init',
    type: 'string',
    width: 1,
  },
  {
    name: 'Input',
    selector: 'input',
    type: 'string',
    width: 1,
  },
  {
    name: 'Refund Address',
    selector: 'refundAddress',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'To',
    selector: 'to',
    type: 'address',
    width: 1,
    searchable: true,
  },
  {
    name: 'Value',
    selector: 'value',
    type: 'wei',
    width: 1,
  },
];
// auto-generate: schema
  
