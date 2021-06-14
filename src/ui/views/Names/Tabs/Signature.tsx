import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { SignatureTable } from './SignatureTable';

export const Signatures = () => {
  const [signature, loading] = useCommand('abis', { known: true, source: true, verbose: 2 });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <SignatureTable getSignature={() => getData(signature)} loadingSignature={loading} />
    </>
  );
};
