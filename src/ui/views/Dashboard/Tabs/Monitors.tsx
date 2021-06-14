import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { MonitorsTable } from './MonitorsTable';

export const Monitors = () => {
  const [monitors, loadingMonitors] = useCommand('status', { mode: 'monitors', detail: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return <MonitorsTable getMonitors={() => getData(monitors)} loadingMonitors={loadingMonitors} />;
};
