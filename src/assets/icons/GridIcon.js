import React from 'react';
import PropTypes from 'prop-types';

const GridIcon = (props) => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...otherProps}>
      <rect x='3' y='3' width='7' height='7' />
      <rect x='14' y='3' width='7' height='7' />
      <rect x='14' y='14' width='7' height='7' />
      <rect x='3' y='14' width='7' height='7' />
    </svg>
  );
};

GridIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GridIcon.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default GridIcon;
