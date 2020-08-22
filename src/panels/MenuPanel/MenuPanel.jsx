/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState } from 'react';

import { useToggles } from 'store';
import { useMenus } from 'pages';
import { Panel, Menu } from 'components/';

import './MenuPanel.css';

//----------------------------------------------------------------------
export const MenuPanel = () => {
  const minimized = !useToggles().state.menu;
  const items = useMenus().menu.items;
  const [selected, setSelected] = useState('');

  const menuHandler = (action) => {
    switch (action.type) {
      case 'menu-clicked':
        setSelected(selected);
        break;
      default:
        break;
    }
  };

  return (
    <Panel title="Menu" type="menu" dir="left" expanded={!minimized}>
      <Menu menu={items} minimized={minimized} selected={selected} handler={menuHandler} />
    </Panel>
  );
};
