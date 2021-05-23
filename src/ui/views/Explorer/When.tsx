import {
  PageHeader,
} from 'antd';
import React, { useCallback } from 'react';

import { NamesFilters } from '@components/Filters';
import { useCommand } from '../../hooks/useCommand';

// import './Names.css';
import { WhenTable } from './WhenTable';

export const WhenView = () => {
  const [when, loadingWhen] = useCommand('when', { list: true });
  const getWhen = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <PageHeader
        title="When"
      />
      <WhenTable getWhen={() => getWhen(when)} loadingWhen={loadingWhen} />
    </>
  );
};
