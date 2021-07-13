import { addColumn, addNumColumn, TableActions } from '@components/Table';
import { Monitor } from '@modules/types';
import { BaseView } from '@components/BaseView';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import React, { useCallback } from 'react';
import {
  SettingsIndexChartsLocation,
  SettingsIndexesLocation,
  SettingsIndexGridLocation,
  SettingsIndexManifestLocation,
  SettingsIndexTableLocation,
} from '../../../../Routes';
import { cookieVars } from '../../../../utils';
import { IndexCharts } from './SubTabs/IndexCharts';
import { IndexGrid } from './SubTabs/IndexGrid';
import { IndexManifest } from './SubTabs/IndexManifest';
import { IndexTable } from './SubTabs/IndexTable';
import { ColumnsType } from 'antd/lib/table';

export const IndexesView = () => {
  const [indexes, loading] = useCommand('status', { mode: 'index', details: true });
  if (indexes.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch indexes',
    });
  }

  const getData = useCallback((response) => {
    return response.status === 'fail' || !response.data[0].caches ? [] : response.data[0].caches[0].items;
  }, []);

  const tabs = [
    {
      name: 'Grid',
      location: SettingsIndexGridLocation,
      component: <IndexGrid key={'grid'} theData={getData(indexes)} loading={loading} />,
    },
    {
      name: 'Table',
      location: SettingsIndexTableLocation,
      component: <IndexTable key={'table'} theData={getData(indexes)} loading={loading} />,
    },
    {
      name: 'Charts',
      location: SettingsIndexChartsLocation,
      component: <IndexCharts key={'chart'} theData={getData(indexes)} loading={loading} />,
    },
    {
      name: 'Manifest',
      location: SettingsIndexManifestLocation,
      component: <IndexManifest key={'manifest'} theData={getData(indexes)} loading={loading} />,
    },
  ];

  return (
    <BaseView
      title={''}
      defaultActive={SettingsIndexGridLocation}
      baseActive={SettingsIndexesLocation}
      cookieName={cookieVars.dashboard_indexes_sub_tab}
      tabs={tabs}
      position='left'
      subBase={true}
    />
  );
};

function padLeft(num: number, size: number, char: string = '0') {
  var s = num + '';
  while (s.length < size) s = char + s;
  return s;
}

const renderBlockRange = (record: Monitor) => {
  return (
    <div>
      <div>
        {padLeft(record.firstApp, 9)}
        {'-'}
        {padLeft(record.latestApp, 9)}
      </div>
      <i>{Intl.NumberFormat().format(record.latestApp - record.firstApp + 1)} blocks</i>
    </div>
  );
};

export const indexSchema: ColumnsType<Monitor> = [
  addColumn({
    title: 'Block Range',
    dataIndex: 'firstApp',
    configuration: {
      render: (item, record) => renderBlockRange(record),
      width: '200px',
    },
  }),
  addColumn({
    title: 'File Date',
    dataIndex: 'fileDate',
  }),
  addNumColumn({
    title: 'nAddrs',
    dataIndex: 'nAddrs',
  }),
  addNumColumn({
    title: 'nApps',
    dataIndex: 'nApps',
    configuration: {
      render: (item: number) => <div style={{ color: 'red', fontWeight: 800 }}>{item}</div>,
    },
  }),
  addNumColumn({
    title: 'firstTs',
    dataIndex: 'firstTs',
  }),
  addNumColumn({
    title: 'latestTs',
    dataIndex: 'latestTs',
  }),
  addNumColumn({
    title: 'indexSizeBytes',
    dataIndex: 'indexSizeBytes',
  }),
  addNumColumn({
    title: 'bloomSizeBytes',
    dataIndex: 'bloomSizeBytes',
  }),
  addColumn({
    title: 'indexHash',
    dataIndex: 'indexHash',
  }),
  addColumn({
    title: 'bloomHash',
    dataIndex: 'bloomHash',
  }),
];
