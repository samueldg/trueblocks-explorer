import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { WhenTable } from './WhenTable';

export const When = () => {
  const [when, loadingWhen] = useCommand('when', { list: true });
  const getWhen = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <WhenTable getWhen={() => getWhen(when)} loadingWhen={loadingWhen} />
    </>
  );
};
