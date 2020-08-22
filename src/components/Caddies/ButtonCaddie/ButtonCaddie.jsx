/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { handleClick } from 'components/utils';
import { Menu } from 'components';

export const ButtonCaddie = ({ name, buttons, current, actionType, handler }) => {
  if (buttons.length === 0) return <div></div>;
  if (!handler) return <div className="warning">No handler given to ButtonCaddie</div>;
  const myHandler = (action) => {
    switch (action.type) {
      case 'menu-clicked':
        handler({type: actionType, payload: action.selected})
        break;
      default:
        break;
    }
  }
  const menu = buttons.map((item) => {
    return (item === 'Separator' || item === '|') ? { label: 'separator' } : { label: item }
  });
 return (<Menu menu={menu} minimized={true} selected={current} handler={myHandler} topLevel={false} />)
};
