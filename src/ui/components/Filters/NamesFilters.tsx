import { Checkbox } from 'antd';
import React, { useCallback, useState } from 'react';

export const NamesFilters = () => {
  const [filters, setFilters] = useState<string[]>([]);
  const addFilter = (filterName: string) => setFilters([...filters, filterName]);
  const removeFilter = (filterToRemove: string) =>
    setFilters(filters.filter((filterName) => filterName !== filterToRemove));

  const onInputChange = useCallback(
    (event, filterName) => (event.target.value ? addFilter(filterName) : removeFilter(filterName)),
    []
  );

  return (
    <section>
      <Checkbox onChange={(event) => onInputChange(event, 'Contracts')}>Contracts</Checkbox>
      <Checkbox onChange={(event) => onInputChange(event, 'Gitcoin Grants')}>Gitcoin Grants</Checkbox>
    </section>
  );
};
