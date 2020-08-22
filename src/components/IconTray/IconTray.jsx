/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { handleClick } from 'components/utils';
import { getIcon } from 'pages/utils';

import './IconTray.css';

export const IconTray = ({ iconList, handler, record_id, alt = { deleted: false, monitored: false } }) => {
  if (!iconList || iconList.length === 0) return <div></div>;
  return (
    <div
      className={record_id ? 'dt-icon-tray-row' : 'dt-icon-tray-header'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(' + iconList.length + ', 1fr)',
      }}
    >
      {iconList.map((a, index) => {
        const alternates = a.replace('footer-', '').replace('header-', '').split('/');
        const icon =
          alternates.length < 2
            ? alternates[0]
            : alternates[alt.deleted ? 1 : alternates.length < 3 ? 0 : alt.monitored ? 2 : 0];
        if (icon === '' || icon === 'None') return null;
        return <ClickableIcon key={'ic_' + index} icon={icon} handler={handler} record_id={record_id} />;
      })}
    </div>
  );
};

//----------------------------------------------------------------------
export const ClickableIcon = ({ link, icon, handler, record_id }) => {
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    );
  }

  return (
    <div style={{ display: 'inline' }} onClick={(e) => handleClick(e, handler, { type: icon, record_id: record_id })}>
      {getIcon(record_id, icon, false, true, 18)}
    </div>
  );
};
