import React from 'react';
import PropTypes from 'prop-types';

const ChevronsDown = (props) => {
  const {color, size, stroke = 2, viewBox = '0 0 24 24', filled = false, ...otherProps} = props;
  const fillColor = filled ? color : 'none';
  const pts = filled ? '6 8 12 14 18 8 6 8' : '6 8 12 14 18 8';
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
      <polyline points='6 18 18 18' />
      <polyline points={pts} />
    </svg>
  );
};

ChevronsDown.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChevronsDown.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default ChevronsDown;
