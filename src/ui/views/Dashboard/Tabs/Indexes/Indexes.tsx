import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  DashboardIndexesLocation, IndexChartsLocation, IndexGridLocation, IndexTableLocation
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { IndexCharts } from './Tabs/IndexCharts';
import { IndexGrid } from './Tabs/IndexGrid';
import { IndexTable } from './Tabs/IndexTable';

export const IndexesView = () => {
  const title = '';
  var tabs = [
    {name: "Grid", location: IndexGridLocation, component: <IndexGrid />},
    {name: "Table", location: IndexTableLocation, component: <IndexTable />},
    {name: "Charts", location: IndexChartsLocation, component: <IndexCharts />},
  ];
  return (
    <BaseView
      title={title}
      defaultActive={IndexGridLocation}
      baseActive={DashboardIndexesLocation}
      cookieName={cookieVars.dashboard_account_sub_tab}
      tabs={tabs}
      position='left'
    />
  );
};
