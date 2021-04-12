import { CloseCircleOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Input,
  notification,
  PageHeader,
  Tabs,
} from 'antd';
import React, { useCallback, useState } from 'react';
import { createErrorNotification } from '@modules/error_notification';

const { TabPane } = Tabs;

const showError = () => notification.error(
  createErrorNotification({ description: 'Just testing' }),
);

export const EntitiesView = () => {
  const [filterInputValue, setFilterInputValue] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const onFilterInputChange = useCallback((event) => {
    setFilterInputValue(event.target.value);
  }, []);
  const addFilter = useCallback((event) => {
    event.preventDefault();
    setFilters([...filters, filterInputValue]);
    setFilterInputValue('');
  }, [filterInputValue]);
  const removeFilter = useCallback((filterToRemove) => setFilters(filters.filter(
    (filter) => filter !== filterToRemove,
  )), [filters]);

  return (
    <>
      <PageHeader
        title="Entities"
      />
      <Tabs>
        <TabPane
          tab="Welcome"
          key="welcome"
        >

          <form onSubmit={addFilter}>
            <Input
              placeholder="e.g. 'address like 0x222a4"
              addonAfter={<Button type="text" onClick={addFilter}>Add filter</Button>}
              onChange={onFilterInputChange} />
          </form>
          <div className="filter-list">
            {filters.map((filter) => (
              <div className="filter" key={filter} onClick={() => removeFilter(filter)}>
                {filter}
                <Badge count={<CloseCircleOutlined />} />
              </div>
            ))}
          </div>

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
};
