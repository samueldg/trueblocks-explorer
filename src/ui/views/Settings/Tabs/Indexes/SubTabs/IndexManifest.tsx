import { addColumn, BaseTable } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const IndexManifest = ({ theData, loading }: { theData: any[]; loading: boolean }) => {
  const [manifest, loadMan] = useCommand('pins', { list: true });
  if (manifest.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch manifest',
    });
  }

  const getData = useCallback((response) => {
    return response.status === 'fail' || !response.data ? [] : response.data;
  }, []);

  return (
    <div style={{ width: '70%' }}>
      <BaseTable dataSource={getData(manifest)} columns={manifestSchema} loading={false} />
    </div>
  );
};

declare type ManifestRecord = {
  fileName: string;
  bloomHash: string;
  indexHash: string;
};

export const manifestSchema: ColumnsType<ManifestRecord> = [
  addColumn({
    title: 'File Name',
    dataIndex: 'fileName',
    configuration: {
      width: '200px',
      render: (value) => <pre>{value}</pre>,
    },
  }),
  addColumn({
    title: 'Bloom Hash',
    dataIndex: 'bloomHash',
    configuration: {
      render: (value) => <pre>{value}</pre>,
    },
  }),
  addColumn({
    title: 'Index Hash',
    dataIndex: 'indexHash',
    configuration: {
      render: (value) => <pre>{value}</pre>,
    },
  }),
];
