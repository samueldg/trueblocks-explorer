/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { Card, PanelTable, ChartTable, DataTable, GridTable, ObjectTable } from 'components';

import './SettingsSkins.css';

//------------------------------------------------------------------------------
export const SettingsSkins = () => {
  const testData = [
    {
      name: 'operatorBurn operatorBurn operatorBurn operatorBurn operatorBurn operatorBurn',
      type: 'function',
      isReady: 'warning',
    },
    {
      name: 'row2',
      type: 'row2',
      isReady: 'value',
    },
    {
      name: 'row3',
      type: 'row3',
      isReady: 'okay',
    },
    {
      name: 'row4',
      type: 'row4',
      isReady: 'warning',
    },
    {
      name: 'row5',
      type: 'row5',
      isReady: 'okay',
    },
  ];
  const oneTest = testData[0];
  const fields = [
    {
      name: 'ID',
      selector: 'id',
      hidden: true,
      onDisplay: (record, fieldName) => {
        return record.name;
      },
    },
    {
      name: 'Name',
      type: 'uint64',
      selector: 'name',
      editable: true,
      chart: 'both',
    },
    {
      name: 'Type',
      selector: 'type',
      type: 'string',
      align: 'center',
      chart: 'both',
    },
    {
      name: 'Ready',
      selector: 'isReady',
      type: 'string',
      isPill: true,
      align: 'center',
      chart: 'both',
    },
  ];
  const style = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '10px',
    justifyItems: 'stretch',
  };

  return (
    <div style={{ width: '1200px' }}>
      <div style={style}>
        <Present>
          <Card title="Card" headerLink={null} headerClass="card-center">
            <ObjectTable data={oneTest} columns={fields} />
          </Card>
        </Present>
        <Present>
          <PanelTable data={oneTest} columns={fields} />
        </Present>
        <Present>
          <ObjectTable data={oneTest} columns={fields} />
        </Present>
      </div>
      <Present>
        <DataTable tableName={'testTable'} title="Data Table (dt-)" data={testData} columns={fields} />
      </Present>
      <Present>
        <GridTable data={testData} columns={fields} rowSpan={1e5} />
      </Present>
      <Present>
        <ChartTable
          data={testData}
          chartName="skins"
          columns={fields}
          pagination={true}
          chartCtx={{ defPair: ['type', 'isReady'] }}
        />
      </Present>
    </div>
  );
};

const Present = ({ children }) => {
  return <div style={{ border: '1px dashed', padding: '30px', marginTop: '10px' }}>{children}</div>;
};
