import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import { SignatureTable } from './SignatureTable';

export const Signatures = () => {
  const [signature, loadingSignature] = useCommand('abis', { known: true, source: true, verbose: 2 });
  const getSignature = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <SignatureTable
        getSignature={() => getSignature(signature)}
        loadingSignature={loadingSignature}
      />
    </>
  );
};
