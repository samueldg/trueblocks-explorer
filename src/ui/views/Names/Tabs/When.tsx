import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { WhenTable } from './WhenTable';

export const When = () => {
  const [when, loadingWhen] = useCommand('when', { list: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <WhenTable getWhen={() => getData(when)} loadingWhen={loadingWhen} />
    </>
  );
};
