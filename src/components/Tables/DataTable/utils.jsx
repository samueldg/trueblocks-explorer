/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
/**
 * hasField - returns true if the given field is found columns, false otherwise
 *
 * @param {array} columns - list of columns in the data table
 * @param {string} field - column to find
 */
function hasField(columns, field) {
  return (
    columns.filter((item) => {
      return item.selector === field;
    }).length > 0
  );
}

/**
 * hasFields - returns true if all fields are found columns, false otherwise
 *
 * @param {array} columns - list of columns in the data table
 * @param {array} fields - an array of strings listing field names
 */
export function hasFields(columns, fields) {
  if (!fields) return false;
  return (
    fields.reduce((sum, field) => {
      return sum + hasField(columns, field);
    }, 0) === fields.length
  );
}

// /**
//  * matches - returns true if the object matches filterText on any field in fields
//  *
//  * @param {object} record - the data object to search
//  * @param {array} fields - the list of fields to search (assumes hasFields returns true)
//  * @param {string} filterText - the text to search for
//  */
// export function matches(record, fields, filterText) {
//   return (
//     fields.reduce((sum, field) => {
//       return sum + record[field] && typeof record[field] === 'string'
//         ? record[field].toLowerCase().includes(filterText)
//         : '';
//     }, 0) > 0
//   );
// }
