import { addColumn, addNumColumn, TableActions } from '@components/Table';
import { useCommand } from '@hooks/useCommand';
import { createErrorNotification } from '@modules/error_notification';
import { ColumnsType } from 'antd/lib/table';
import React, { useCallback } from 'react';

export const IndexCharts = ({ theData, loading }: { theData: any[]; loading: boolean }) => {
  return <div>Charts of the index</div>;
};
