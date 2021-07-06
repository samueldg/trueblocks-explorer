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
import { IndexCharts } from './Tabs/IndexCharts';
import { IndexGrid } from './Tabs/IndexGrid';
import { IndexManifest } from './Tabs/IndexManifest';
import { IndexTable } from './Tabs/IndexTable';

export const IndexesView = () => {
  const title = '';
  var tabs = [
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
      subBase={true}
      tabs={tabs}
      position='left'
    />
  );
};
