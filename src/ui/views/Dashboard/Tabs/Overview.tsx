import {
  Button,
  notification,
} from 'antd';
import React from 'react';
import { createErrorNotification } from '@modules/error_notification';

const showError = () => notification.error(
  createErrorNotification({ description: 'Just testing' }),
);

export const Overview = () => (
  <>
    Welcome to TrueBlocks Explorer
    <Button type="primary" onClick={showError}>Error</Button>
  </>
);
