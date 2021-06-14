import { NamesFilters } from '@components/Filters';
import { PageHeader } from 'antd';
import React, { useCallback } from 'react';
import { useCommand } from '../../../hooks/useCommand';
import './NamedAddrs.css';
import { NamesTable } from './NamedAddrsTable';

export const NamedAddrs = () => {
  const [names, loadingNames] = useCommand('names', { expand: true });
  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);

  return (
    <>
      <PageHeader title='Names' />
      <NamesFilters />
      <NamesTable getNames={() => getData(names)} loadingNames={loadingNames} />
    </>
  );
};
