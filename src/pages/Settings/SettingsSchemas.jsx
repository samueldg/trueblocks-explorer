/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState } from 'react';

import { menuSchema } from 'pages/index';
import { systemsSchema } from 'pages/Settings/SettingsSystemsSchema';
import { schemasSchema } from 'pages/Settings/SettingsSchemasSchema';

import { DataTable, ObjectTable, ButtonCaddie } from 'components';
import { stateFromStorage } from 'components/utils';

import { abisSchema } from 'pages/Explorer/ExplorerAbisSchema';
import { blocksSchema } from 'pages/Explorer/ExplorerBlocksSchema';
import { functionsSchema } from 'pages/Explorer/ExplorerFunctionsSchema';
import { logsSchema } from 'pages/Explorer/ExplorerLogsSchema';
import { parametersSchema } from 'pages/Explorer/ExplorerParametersSchema';
import { pricequotesSchema } from 'pages/Explorer/ExplorerPricequotesSchema';
import { pricesourcesSchema } from 'pages/Explorer/ExplorerPricesourcesSchema';
import { receiptsSchema } from 'pages/Explorer/ExplorerReceiptsSchema';
import { traceActionsSchema } from 'pages/Explorer/ExplorerTraceActionsSchema';
import { traceResultsSchema } from 'pages/Explorer/ExplorerTraceResultsSchema';
import { tracesSchema } from 'pages/Explorer/ExplorerTracesSchema';
import { transactionsSchema } from 'pages/Explorer/ExplorerTransactionsSchema';

// auto-generate: all-schemas
import { entitiesSchema } from 'pages/Entities/EntitiesSchema';
import { monitorsSchema } from 'pages/Monitors/MonitorsSchema';
import { accountsSchema } from 'pages/Accounts/AccountsSchema';
import { summarySchema } from 'pages/Summary/SummarySchema';
import { tagsSchema } from 'pages/Tags/TagsSchema';
import { explorerSchema } from 'pages/Explorer/ExplorerSchema';
import { namesSchema } from 'pages/Names/NamesSchema';
import { signaturesSchema } from 'pages/Signatures/SignaturesSchema';
import { digestsSchema } from 'pages/Digests/DigestsSchema';
import { cachesSchema } from 'pages/Caches/CachesSchema';
import { otherSchema } from 'pages/Other/OtherSchema';
import { settingsSchema } from 'pages/Settings/SettingsSchemasSchema';
import { supportSchema } from 'pages/Support/SupportSchema';
// auto-generate: all-schemas

//------------------------------------------------------------------------------
export const SettingsSchemas = () => {
  const [current, setCurrent] = useState(stateFromStorage('current-schema', 'systemsSchema', true));

  const schemas = useSchemas();
  const matched = schemas.filter((item) => item.name === current)[0];
  const hasIcons =
    matched &&
    matched.schema.filter((field) => {
      return field.type === 'icons';
    }).length > 0;
  const mocks = matched ? mockData(matched.schema) : [];
  let unknown = [];
  let known = [];
  let classes = [];
  if (matched) {
    matched.schema
      .filter((item) => {
        switch (item.type) {
          case 'string':
          case 'function':
          case 'hash':
          case 'bool':
          case 'object':
          case 'timestamp':
          case 'array':
          case 'filesize':
          case 'icons':
            known.push(item.type);
            return false;
          case 'blknum':
          case 'address':
          case 'uint32':
          case 'uint64':
          case 'wei':
          case 'ether':
          case 'gas':
          case 'bytes32':
          case 'double':
          case 'value':
          case 'separator':
            classes.push(item.type);
            return false;
          case 'CAbi':
          case 'CBlock':
          case 'CLogEntry':
          case 'CParameter':
          case 'CTrace':
          case 'CTransaction':
          case 'CClient':
          case 'CFunction':
          case 'CTraceAction':
          case 'CTraceResult':
          case 'CReceipt':
            classes.push(item.type);
            return false;
          case 'CAddressArray':
          case 'CFunctionArray':
          case 'CParameterArray':
          case 'CStringArray':
          case 'CTopicArray':
          case 'CLogEntryArray':
          case 'CTraceArray':
          case 'CTransactionArray':
            classes.push(item.type);
            return false;
          default:
            unknown.push(item.type);
            return true;
        }
      })
      .join(', ');
  }

  const changeSchema = (action) => {
    switch (action.type) {
      case 'change-schema':
        localStorage.setItem('current-schema', action.payload);
        setCurrent(action.payload);
        break;
      default:
        break;
    }
  };

  const systemList = schemas.filter((s) => s.group === 'system').map((schema) => schema.name);
  const pagesList = schemas.filter((s) => s.group === 'pages_').map((schema) => schema.name);
  const exploreList = schemas.filter((s) => s.group === 'explore').map((schema) => schema.name);

  let debug = false;
  return (
    <div>
      {debug && <pre>{JSON.stringify(schemasSchema, null, 2)}</pre>}
      {/* prettier-ignore */}
      <ButtonCaddie
        name="system"
        buttons={systemList}
        current={current}
        actionType="change-schema"
        handler={changeSchema}
      />
      {/* prettier-ignore */}
      <ButtonCaddie
        name="pages_"
        buttons={pagesList}
        current={current}
        actionType="change-schema"
        handler={changeSchema}
      />
      <ButtonCaddie
        name='explore'
        buttons={exploreList}
        current={current}
        actionType='change-schema'
        handler={changeSchema}
      />
      <div className='okay'>{known.join(', ')}</div>
      <div className='caution'>{classes.join(', ')}</div>
      <div className='warning'>{unknown.join(', ')}</div>
      {/* prettier-ignore */}
      <div>
        <br />
        {matched && <DataTable
          tableName={'schemaTable'}
          key={matched.name + 'm'}
          title={'Schema for ' + matched.name.replace('Schema', '')}
          data={matched.schema}
          columns={schemasSchema}
          search={false}
          pagination={false}
        />}
      </div>
      <br />
      <table width='100%' style={{ border: '1px solid black' }}>
        <tr>
          <td valign='top' align='left' width='25%' style={{ border: '1px solid black' }}>
            <h4>JSON</h4>
            <pre>{JSON.stringify(mocks, null, 2)}</pre>
          </td>
          <td valign='top' align='left' width='75%' style={{ border: '1px solid black' }}>
            <h4>Example Tables</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 30fr 1fr',
              }}>
              <div></div>
              <div>
                {matched && (
                  <DataTable
                    tableName={'mocksTable'}
                    key={matched.name + 'm'}
                    title={''}
                    data={mocks}
                    columns={matched.schema}
                    search={false}
                    pagination={false}
                    showHidden={true}
                    detailLevel={2}
                    recordIcons={hasIcons ? ['Add', 'Edit'] : []}
                  />
                )}
                <br />
              </div>
              <div></div>
              <div></div>
              <div>
                {matched && (
                  <ObjectTable
                    key={matched.name + 'm'}
                    title={''}
                    data={mocks[0]}
                    columns={matched.schema}
                    search={false}
                    pagination={false}
                    showHidden={true}
                    detailLevel={2}
                  />
                )}
              </div>
            </div>
          </td>
        </tr>
      </table>
      {/*
       */}
    </div>
  );
};

const useSchemas = () => {
  return [
    { group: 'system', name: 'menuSchema', schema: menuSchema },
    { group: 'system', name: 'systemsSchema', schema: systemsSchema },
    { group: 'system', name: 'schemasSchema', schema: schemasSchema },

    // auto-generate: use-schemas
    { group: 'pages_', name: 'entitiesSchema', schema: entitiesSchema },
    { group: 'pages_', name: 'monitorsSchema', schema: monitorsSchema },
    { group: 'pages_', name: 'accountsSchema', schema: accountsSchema },
    { group: 'pages_', name: 'summarySchema', schema: summarySchema },
    { group: 'pages_', name: 'tagsSchema', schema: tagsSchema },
    { group: 'pages_', name: 'explorerSchema', schema: explorerSchema },
    { group: 'pages_', name: 'namesSchema', schema: namesSchema },
    { group: 'pages_', name: 'signaturesSchema', schema: signaturesSchema },
    { group: 'pages_', name: 'digestsSchema', schema: digestsSchema },
    { group: 'pages_', name: 'cachesSchema', schema: cachesSchema },
    { group: 'pages_', name: 'otherSchema', schema: otherSchema },
    { group: 'pages_', name: 'settingsSchema', schema: settingsSchema },
    { group: 'pages_', name: 'supportSchema', schema: supportSchema },
    // auto-generate: use-schemas

    { group: 'explore', name: 'abisSchema', schema: abisSchema },
    { group: 'explore', name: 'functionsSchema', schema: functionsSchema },
    { group: 'explore', name: 'parametersSchema', schema: parametersSchema },
    { group: 'explore', name: 'blocksSchema', schema: blocksSchema },
    { group: 'explore', name: 'transactionsSchema', schema: transactionsSchema },
    { group: 'explore', name: 'receiptsSchema', schema: receiptsSchema },
    { group: 'explore', name: 'logsSchema', schema: logsSchema },
    { group: 'explore', name: 'tracesSchema', schema: tracesSchema },
    { group: 'explore', name: 'traceActionsSchema', schema: traceActionsSchema },
    { group: 'explore', name: 'traceResultsSchema', schema: traceResultsSchema },
    { group: 'explore', name: 'pricequotesSchema', schema: pricequotesSchema },
    { group: 'explore', name: 'pricesourcesSchema', schema: pricesourcesSchema },
  ];
};

//------------------------------------------------------------------------------
function mock(columns, tag) {
  let record = {};
  columns.map((column) => {
    let value = column.name + '_' + tag;
    if (column.type === 'uint64') value = 12 + Number(tag);
    if (column.type === 'filesize') value = 1200100 + Number(tag);
    if (column.type === 'timestamp') value = 1438270144 + Number(tag);
    if (column.type === 'function') value = 'function' + Number(tag);
    if (column.isPill) value = true;
    return (record[column.selector] = value);
  });
  return record;
}

//------------------------------------------------------------------------------
function mockData(columns) {
  return [mock(columns, '1'), mock(columns, '2'), mock(columns, '12'), mock(columns, '8')];
}

//----------------------------------------------------------------------------
function getFieldValue(record, fieldName) {
  if (!record) return '';
  switch (fieldName) {
    case 'id':
      return record.selector; // this is right - it's a confusing name
    default:
      return record[fieldName];
  }
  return record[fieldName];
}
