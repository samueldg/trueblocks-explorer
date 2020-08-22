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
export const traceResultsSchema = [
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
    name: 'Code',
    selector: 'code',
    type: 'string',
    width: 1,
    searchable: true,
  },
  {
    name: 'Gas Used',
    selector: 'gasUsed',
    type: 'gas',
    width: 1,
  },
  {
    name: 'Output',
    selector: 'output',
    type: 'string',
    width: 1,
    searchable: true,
  },
];
// auto-generate: schema
  
