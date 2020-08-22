/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { useToggles } from 'store';
import { MenuPanel, ContentPanel, StatusPanel, HelpPanel } from 'panels/';

import './PageContent.css';

//----------------------------------------------------------------------
export const PageContent = () => {
  return (
    <div className={'page-content shape_' + usePanelBits()}>
      <MenuPanel />
      <StatusPanel />
      <ContentPanel />
      <HelpPanel />
    </div>
  );
};

//----------------------------------------------------------------------
const usePanelBits = () => {
  const panelState = useToggles().state;
  let ret = '';
  ret += panelState.menu ? '1' : '0';
  ret += panelState.content ? '1' : '0';
  ret += panelState.status ? '1' : '0';
  ret += panelState.help ? '1' : '0';
  return ret;
};
