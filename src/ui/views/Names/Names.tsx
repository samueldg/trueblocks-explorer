import {
  PageHeader,
} from 'antd';
import React, { useCallback } from 'react';

import { NamesFilters } from '@components/Filters';
import { useCommand } from '../../hooks/useCommand';

import './Names.css';
import { NamesTable } from './NamesTable';

export const NamesView = () => {
  const [names, loadingNames] = useCommand('names', { expand: true });
  const getNames = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <PageHeader
        title="Names"
      />
      <NamesFilters />

      <NamesTable getNames={() => getNames(names)} loadingNames={loadingNames} />
    </>
  );
};
