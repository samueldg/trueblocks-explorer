import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { createErrorNotification } from '@modules/error_notification';
import { Loading } from '@components/Loading';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const BlocksView = () => {
  const [data, loading1] = useCommand('blocks', { blocks: 'latest', hashes: true, cache: true });
  const [detail, loading2] = useCommand('blocks', { blocks: 'latest', cache: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);
  if (data.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch blocks',
    });
  }
  const theItem = getData(data);
  const theDetail = getData(detail);
  const title = `Exploring transaction [${theItem}]`;

  return (
    <Loading loading={loading1 && loading2}>
      <PageHeader title={title} />
      <Tabs>
        <TabPane tab="Summary" key="summary">
          <pre>{JSON.stringify(theItem, null, 2)}</pre>
        </TabPane>
        <TabPane tab="Details" key="details">
          <pre>{JSON.stringify(theDetail, null, 2)}</pre>
        </TabPane>
      </Tabs>
    </Loading>
  );
};
