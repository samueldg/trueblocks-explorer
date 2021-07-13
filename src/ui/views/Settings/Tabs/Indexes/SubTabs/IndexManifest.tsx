import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import React, { useCallback } from 'react';

export const IndexManifest = () => {
  const [manifest, loading] = useCommand('pins', { list: true });
  if (manifest.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch manifest',
    });
  }

  const getData = useCallback((response) => {
    return response.status === 'fail' || !response.data[0].caches ? [] : response.data[0].caches[0].items;
  }, []);

  // return <BaseTable dataSource={getData(indexes)} columns={indexSchema} loading={loading} />;
  return <pre>{JSON.stringify(manifest, null, 2)}</pre>;
};
