import {
  ExplorerBlocksLocation,
  ExplorerLocation,
  ExplorerLogsLocation,
  ExplorerReceiptsLocation,
  ExplorerTracesLocation,
  ExplorerTransactionsLocation,
} from '../../Routes';

import { BaseView } from '@components/BaseView';
import { Blocks } from './Tabs/Blocks';
import { Logs } from './Tabs/Logs';
import React from 'react';
import { Receipts } from './Tabs/Receipts';
import { Traces } from './Tabs/Traces';
import { Transactions } from './Tabs/Transactions';
import { cookieVars } from '../../utils';

export const ExplorerView = () => {
  const title = 'Explorer';
  const tabs = [
    { name: 'Blocks', location: ExplorerBlocksLocation, component: <Blocks /> },
    { name: 'Transactions', location: ExplorerTransactionsLocation, component: <Transactions /> },
    { name: 'Receipts', location: ExplorerReceiptsLocation, component: <Receipts /> },
    { name: 'Logs', location: ExplorerLogsLocation, component: <Logs /> },
    { name: 'Traces', location: ExplorerTracesLocation, component: <Traces /> },
  ];

  // console.log('ExplorerView');
  return (
    <div>
      <div style={{ backgroundColor: 'orange', color: 'black' }}>This module is not completed.</div>
      <BaseView
        title={title}
        defaultActive={ExplorerBlocksLocation}
        baseActive={ExplorerLocation}
        cookieName={cookieVars.explorer_current_tab}
        tabs={tabs}
      />
    </div>
  );
};
