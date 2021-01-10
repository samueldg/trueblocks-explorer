import React, {Fragment} from 'react';

//import Circle from './Circle';
//import Default from './Default';
//import DualRing from './DualRing';
import Ellipsis from './Ellipsis';
import Facebook from './Facebook';
//import Grid from './Grid';
//import Heart from './Heart';
//import Hourglass from './Hourglass';
//import Orbitals from './Orbitals';
//import Ring from './Ring';
//import Ripple from './Ripple';
//import Roller from './Roller';
//import Spinner from './Spinner'
//import Ouroboro from './Ouroboro';

export {
  //  Circle,
  //  Default,
  //  DualRing,
  Ellipsis,
  Facebook,
  //  Grid,
  //  Heart,
  //  Hourglass,
  //  Orbitals,
  //  Ring,
  //  Ripple,
  //  Roller,
  //  Spinner,
  //  Ouroboro,
};

export const Spinner = ({showing, which, color, className, style, size}) => {
  if (!showing) return <Fragment></Fragment>;
  switch (which) {
    case 'ellipsis':
      return <Ellipsis color={color} className={className} style={{textShadow: '2px 2px red', ...style}} size={size} />;
    case 'facebook':
      return <Facebook color={color} className={className} style={style} size={size} />;
    default:
      return <Fragment></Fragment>;
  }
};
