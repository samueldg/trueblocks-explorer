/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { currentPage, handleClick } from 'components/utils';
import { getIcon } from 'pages/utils';

import './Menu.css';

//----------------------------------------------------------------------
export const Menu = ({ menu, parent = '', minimized, selected, handler, useIcons = true, topLevel = true }) => {
  if (!menu) return <Fragment></Fragment>;

  const indent = parent !== '';
  const cn = indent ? 'menu-indent' : '';

  return (
    <div style={topLevel ? {} : { display: 'flex' }}>
      {menu.map((item, index) => {
        if (!item.label) return null;
        const isSep = item.label.toLowerCase() === 'separator' || item.lable === '|';
        if (isSep && topLevel) {
          let sep = '- - - - - - - - - - - - - - - - ';
          if (minimized) sep = sep.substr(0, 12);
          return (
            <div key={'sep_' + index} className={cn + ' menu-separator'}>
              {sep}
            </div>
          );
        } else if (isSep) {
          return <div key={'sep_' + index} >&nbsp;&nbsp;</div>
        }

        const { label, exact, items } = item;
        const icon = (!useIcons || indent) ? <Fragment></Fragment> : getIcon(index, label, !minimized, false, 20);
        const route = cleanPath(label, parent, item.route);
        return (
          <MenuItem
            key={route}
            label={label}
            icon={icon}
            indent={indent}
            minimized={minimized}
            to={route}
            exact={exact}
            parent={parent}
            selected={selected}
            handler={handler}
            topLevel={topLevel}
          >
            <Menu menu={minimized ? null : items} parent={label.toLowerCase()} exact={exact} minimized={minimized} />
          </MenuItem>
        );
      })}
    </div>
  );
};

//----------------------------------------------------------------------
export const MenuItem = ({ label, icon, to, indent, exact, minimized, parent, selected, handler, topLevel, children }) => {
  let cn = '';
  if (indent) cn = 'menu-indent';

  const { page } = currentPage();
  const active = page !== '/' && to.includes(page);
  const action = { type: 'menu-clicked', selected: label, parent: parent };

  if (topLevel) {
    return (
      <Fragment>
        <NavLink
          className={cn + ' menu-item'}
          activeClassName="is-active"
          exact={exact}
          to={to}
          onClick={(e) => { return handler && handler(action); }}
        >
          {icon}
          {(!minimized || !icon) && label}
        </NavLink>
        {active && children}
      </Fragment>
    );
  }

  return (
    <button
      key={label}
      className={label === selected ? "activeButton" : ""}
      onClick={(e) => { handleClick(e, handler, action); return true; } } >
      {label}
    </button>
  );
};

//----------------------------------------------------------------------
const cleanPath = (label, parent, pathIn) => {
  let ret = pathIn;
  if (!ret || ret === '') ret = '/' + label.toLowerCase().replace(/\.\.\./, '');
  else ret = '/' + (ret === '/' ? '' : ret);
  if (parent !== '') ret = '/' + parent + ret;
  return ret;
};
