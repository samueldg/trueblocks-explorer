/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useToggles } from 'store';
import { handleClick } from 'components/utils';
import ChevronLeft from 'assets/icons/ChevronLeft';
import ChevronRight from 'assets/icons/ChevronRight';
import './Panel.css';

//----------------------------------------------------------------------
export const Panel = ({
  title,
  iconTray,
  headerClass = '',
  headerLink = '',
  topIcon,
  type,
  dir,
  expanded,
  children,
}) => {
  const pHeader = (
    <PanelHeader title={title} headerClass={headerClass} topIcon={topIcon} type={type} dir={dir} expanded={expanded} />
  );

  const header = headerLink && headerLink !== '' ? <Link to={headerLink}>{pHeader}</Link> : pHeader;
  const bottomIcons = iconTray ? (
    <div className="icon-tray">
      {iconTray.map((icon, idx) => {
        return <div key={idx}>{icon}</div>;
      })}
    </div>
  ) : (
    <Fragment></Fragment>
  );

  return (
    <div key={type} className={type}>
      {header}
      {children}
      {bottomIcons}
    </div>
  );
};

//----------------------------------------------------------------------
const PanelHeader = ({ title, headerClass, topIcon, type, dir, expanded, options }) => {
  const showIcon = !headerClass || !headerClass.includes('center');
  const icon = showIcon ? (
    <div className="panel-icon">
      {topIcon ? topIcon : <ExpandIcon type={type} direction={dir} expanded={expanded} />}
    </div>
  ) : (
    <Fragment></Fragment>
  );
  return (
    <div className={headerClass !== '' ? headerClass : 'panel-header'}>
      <div>{expanded ? title : ''}</div>
      {icon}
    </div>
  );
};

//----------------------------------------------------------------------
const ExpandIcon = ({ type, direction, expanded }) => {
  const togglesDispatch = useToggles().dispatch;
  const action = { type: type };
  const leftIcon = <ChevronLeft onClick={(e) => handleClick(e, togglesDispatch, action)} />;
  const rightIcon = <ChevronRight onClick={(e) => handleClick(e, togglesDispatch, action)} />;
  if (direction === 'left') return expanded ? leftIcon : rightIcon;
  return expanded ? rightIcon : leftIcon;
};
