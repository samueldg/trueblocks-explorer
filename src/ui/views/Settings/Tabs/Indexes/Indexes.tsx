import { BaseView } from '@components/BaseView';
import React from 'react';
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

export const IndexesView = () => {
  const title = '';
  const tabs = [
    { name: 'Grid', location: SettingsIndexGridLocation, component: <IndexGrid /> },
    { name: 'Table', location: SettingsIndexTableLocation, component: <IndexTable /> },
    { name: 'Charts', location: SettingsIndexChartsLocation, component: <IndexCharts /> },
    { name: 'Manifest', location: SettingsIndexManifestLocation, component: <IndexManifest /> },
  ];
  return (
    <BaseView
      title={title}
      defaultActive={SettingsIndexGridLocation}
      baseActive={SettingsIndexesLocation}
      cookieName={cookieVars.dashboard_indexes_sub_tab}
      tabs={tabs}
      position='left'
      subBase={true}
    />
  );
};
