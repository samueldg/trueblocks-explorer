import React from 'react';
import PropTypes from 'prop-types';

const ChevronsUp = (props) => {
  const {color, size, stroke = 2, viewBox = '0 0 24 24', filled = false, ...otherProps} = props;
  const fillColor = filled ? color : 'none';
  const pts = filled ? '6 18 12 12 18 18 6 18' : '6 18 12 12 18 18';
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
      <polyline points='6 8 18 8' />
      <polyline points={pts} />
    </svg>
  );
};

ChevronsUp.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ChevronsUp.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default ChevronsUp;

// import React from 'react';
// import PropTypes from 'prop-types';

// const ChevronsUp = (props) => {
//   const { color, size, ...otherProps } = props;
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke={color}
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       {...otherProps}
//     >
//       <polyline points="17 11 12 6 7 11" />
//       <polyline points="17 18 12 13 7 18" />
//     </svg>
//   );
// };

// ChevronsUp.propTypes = {
//   color: PropTypes.string,
//   size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };

// ChevronsUp.defaultProps = {
//   color: 'currentColor',
//   size: '24',
// };

// export default ChevronsUp;
