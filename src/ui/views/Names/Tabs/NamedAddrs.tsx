import { NamesFilters } from '@components/Filters';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import './NamedAddrs.css';
import { NamesTable } from './NamedAddrsTable';

export const NamedAddrs = () => {
  const [names, loading] = useCommand('names', { expand: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <NamesFilters />
      <NamesTable getNames={() => getData(names)} loadingNames={loading} />
    </>
  );
};
