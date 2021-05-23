import { PageHeader, Tabs } from 'antd';
import React, { useCallback } from 'react';
import { createErrorNotification } from '@modules/error_notification';
import { Loading } from '@components/Loading';
import { useCommand } from '../../hooks/useCommand';

const { TabPane } = Tabs;

export const BlocksView = () => {
  const [data, loadingBlock] = useCommand('blocks', { blocks: 46147, hashes: true, cache: true });
  const [detail, loadingDetail] = useCommand('blocks', { blocks: 46147, cache: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  const theItem = getData(data);
  if (data.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch block',
    });
  }

  const theDetail = getData(detail);
  if (detail.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch block detail',
    });
  }

  const title = `Exploring transaction [${theItem}]`;
  return (
    <Loading loading={loadingBlock || loadingDetail}>
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
