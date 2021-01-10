import React from 'react';
import PropTypes from 'prop-types';

const ChevronsRight = (props) => {
  const {color, size, stroke = 2, viewBox = '0 0 24 24', filled = false, ...otherProps} = props;
  const fillColor = filled ? color : 'none';
  const pts = filled ? '9 18 15 12 9 6 9 18' : '9 18 15 12 9 6';
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fillColor}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...otherProps}>
      <polyline points='19 18 19 6' />
      <polyline points={pts} />
    </svg>
  );
};

ChevronsRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChevronsRight.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default ChevronsRight;
