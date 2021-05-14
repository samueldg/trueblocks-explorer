import {
  Button,
  notification,
  PageHeader,
  Tabs,
} from 'antd';
import React from 'react';
import { NamesFilters } from '@components/Filters';
import { createErrorNotification } from '@modules/error_notification';

const { TabPane } = Tabs;

const showError = () => notification.error(
  createErrorNotification({ description: 'Just testing' }),
);

export const EntitiesView = () => (
  <>
    <PageHeader
      title="Entities"
    />
    <Tabs>
      <TabPane
        tab="Welcome"
        key="welcome"
      >
        <NamesFilters />
        Welcome to TrueBlocks Explorer

        <Button type="primary" onClick={showError}>Error</Button>
      </TabPane>
      <TabPane
        tab="Scraper"
        key="scraper"
      >
        Scraper is scraping
      </TabPane>
    </Tabs>
  </>
);
