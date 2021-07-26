import { GridTable } from '@components/GridTable';
import { addColumn, addNumColumn } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';
import { indexSchema } from '../Indexes';

export const IndexGrid = ({ theData, loading }: { theData: any[]; loading: boolean }) => {
  return <GridTable data={theData} columns={indexSchema} />;
};
