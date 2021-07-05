import React from 'react';
import { Link } from 'react-router-dom';

export const renderNamedAddress = (record: any, location: string) => {
  return (
    <div>
      <div>{record.name === '' ? <div style={{ fontStyle: 'italic' }}>not named</div> : record.name}</div>
      <Link to={location}>{record.address}</Link>
    </div>
  );
};
