/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { Panel } from 'components/';
import './Card.css';

/**
 * Card - an enhanced Panel component with a shadowed display
 * @param {Object} $0 - props
 * @param {string} $0.title - title of the card
 * @param {route} $0.headerLink - optional link if user clicks on header
 * @param {cssClass} $0.headerClass - optional CSS class for header (defaults to 'card-header')
 * @param {icon} $0.topIcon - optional icon component to display in top right of card header (see Panel component)
 * @param {icons} $0.iconTray - optional list of Icon components to display in bottom icon tray icons (see Panel)
 * @param {elements} $0.children - an optional list of elements to display on the card
 */
export const Card = ({ title, headerLink, headerClass = 'card-header', topIcon, iconTray, children }) => {
  return (
    <div className="card">
      <Panel
        title={title}
        iconTray={iconTray}
        headerClass={headerClass}
        topIcon={topIcon}
        headerLink={headerLink}
        type="monitor"
        expanded={true}
      >
        {children}
      </Panel>
    </div>
  );
};
