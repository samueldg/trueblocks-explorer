import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { WhenTable } from './WhenTable';

export const When = () => {
  const [when, loading] = useCommand('when', { list: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <WhenTable getWhen={() => getData(when)} loadingWhen={loading} />
    </>
  );
};
