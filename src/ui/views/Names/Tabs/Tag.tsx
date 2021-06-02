import React, { useCallback } from 'react';

import { useCommand } from '../../../hooks/useCommand';
import { TagTable } from './TagTable';

export const Tags = () => {
  const [tag, loadingTag] = useCommand('names', { tags: true });
  const getTag = useCallback((response) => (response.status === 'fail' ? [] : response.content), []);

  return (
    <>
      <TagTable getTag={() => getTag(tag)} loadingTag={loadingTag} />
    </>
  );
};
