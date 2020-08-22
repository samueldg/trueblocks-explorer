import React from 'react';
import PropTypes from 'prop-types';

const ChevronRight = (props) => {
  const { color, size, stroke = 2, viewBox = '0 0 24 24', filled = false, ...otherProps } = props;
  const fillColor = filled ? color : 'none';
  const pts = filled ? '9 18 15 12 9 6 9 18' : '9 18 15 12 9 6';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fillColor}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
      <polyline points={pts} />
    </svg>
  );
};

ChevronRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChevronRight.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default ChevronRight;
