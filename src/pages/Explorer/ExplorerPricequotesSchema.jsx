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
export const pricequotesSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'date',
    selector: 'date',
    type: 'date',
    width: 1,
    searchable: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'timestamp',
    selector: 'timestamp',
    type: 'timestamp',
    width: 1,
  },
  {
    name: 'close',
    selector: 'close',
    type: 'double',
    width: 1,
  },
];
// auto-generate: schema
  
