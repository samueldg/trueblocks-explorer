import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { MonitorsTable } from './MonitorsTable';

export const Monitors = () => {
  const [monitors, loading] = useCommand('status', { mode: 'monitors', detail: true });
  const getMonitors = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <MonitorsTable getMonitors={() => getMonitors(monitors)} loadingMonitors={loading} />
  );
};
