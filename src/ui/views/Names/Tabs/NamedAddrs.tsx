import {
  PageHeader,
} from 'antd';
import React, { useCallback } from 'react';

import { NamesFilters } from '@components/Filters';
import { useCommand } from '../../../hooks/useCommand';

import './NamedAddrs.css';
import { NamesTable } from './NamedAddrsTable';

export const NamedAddrs = () => {
  const [names, loadingNames] = useCommand('names', { expand: true });
  const getNames = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <NamesFilters />
      <NamesTable getNames={() => getNames(names)} loadingNames={loadingNames} />
    </>
  );
};
