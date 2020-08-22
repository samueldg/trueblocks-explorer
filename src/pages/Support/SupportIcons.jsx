/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment } from 'react';

import Add from 'assets/icons/Add';
import AddMonitor from 'assets/icons/AddMonitor';
import AddName from 'assets/icons/AddName';
import BarChart from 'assets/icons/BarChart';
import InternalLink from 'assets/icons/InternalLink';
import ExternalLink from 'assets/icons/ExternalLink';
//import Check from 'assets/icons/Check';
import CheckCircle from 'assets/icons/CheckCircle';
import CheckCircleYellow from 'assets/icons/CheckCircleYellow';
import ChevronDown from 'assets/icons/ChevronDown';
import ChevronLeft from 'assets/icons/ChevronLeft';
import ChevronRight from 'assets/icons/ChevronRight';
import ChevronUp from 'assets/icons/ChevronUp';
import ChevronsDown from 'assets/icons/ChevronsDown';
import ChevronsLeft from 'assets/icons/ChevronsLeft';
import ChevronsRight from 'assets/icons/ChevronsRight';
import ChevronsUp from 'assets/icons/ChevronsUp';
import Delete from 'assets/icons/Delete';
import Discord from 'assets/icons/Discord';
import Edit from 'assets/icons/Edit';
import FaceBook from 'assets/icons/FaceBook';
import GitHub from 'assets/icons/GitHub';
import GridIcon from 'assets/icons/GridIcon';
import HelpCircle from 'assets/icons/HelpCircle';
import Medium from 'assets/icons/Medium';
//import Plus from 'assets/icons/Plus';
import PlusCircle from 'assets/icons/PlusCircle';
//import PlusSquare from 'assets/icons/PlusSquare';
import Remove from 'assets/icons/Remove';
import ToggleLeft from 'assets/icons/ToggleLeft';
import ToggleCenter from 'assets/icons/ToggleCenter';
import ToggleRight from 'assets/icons/ToggleRight';
import Twitter from 'assets/icons/Twitter';
import GitCoin from 'assets/icons/GitCoin';
import Undelete from 'assets/icons/Undelete';
import View from 'assets/icons/View';
//import X from 'assets/icons/X';
import XCircle from 'assets/icons/XCircle';

import {
  Monitors,
  Accounts,
  Explorer,
  Names,
  Tags,
  Signatures,
  Digests,
  Caches,
  Other,
  Settings,
  Support,
} from 'assets/icons/SetMenus';

export const SupportIcons = () => {
  const size = 23;
  const fill = 'orange';
  const color = 'black';
  const style = {
    height: '38px',
    width: '38px',
    margin: '6px',
  };

  const icons = [
    {
      group: 'Menus',
      items: [
        { name: 'Monitors', component: <Monitors size={size} color={color} fill={fill} style={style} /> },
        { name: 'Accounts', component: <Accounts size={size} color={color} fill={fill} style={style} /> },
        { name: 'Explorer', component: <Explorer size={size} color={color} fill={fill} style={style} /> },
        { name: 'Names', component: <Names size={size} color={color} fill={fill} style={style} /> },
        { name: 'Tags', component: <Tags size={size} color={color} fill={fill} style={style} /> },
        { name: 'Signatures', component: <Signatures size={size} color={color} fill={fill} style={style} /> },
        { name: 'Digests', component: <Digests size={size} color={color} fill={fill} style={style} /> },
        { name: 'Caches', component: <Caches size={size} color={color} fill={fill} style={style} /> },
        { name: 'Other', component: <Other size={size} color={color} fill={fill} style={style} /> },
        { name: 'Settings', component: <Settings size={size} color={color} fill={fill} style={style} /> },
        { name: 'Support', component: <Support size={size} color={color} fill={fill} style={style} /> },
      ],
    },
    {
      group: 'Monitors',
      items: [
        { name: 'Add Monitor', component: <AddMonitor size={size} color={color} fill={fill} style={style} /> },
        { name: 'Add Name', component: <AddName size={size} color={color} fill={fill} style={style} /> },
        { name: 'View Monitor', component: <View size={size} color={color} fill={fill} style={style} /> },
        { name: 'Paused', component: <ToggleLeft size={size} color={color} fill={fill} style={style} /> },
        { name: 'Neutral', component: <ToggleCenter size={size} color={color} fill={fill} style={style} /> },
        { name: 'Active', component: <ToggleRight size={size} color={color} fill={fill} style={style} /> },
      ],
    },
    {
      group: 'Editing',
      items: [
        { name: 'Add', component: <Add size={size} color={color} fill={fill} style={style} /> },
        { name: 'Edit', component: <Edit size={size} color={color} fill={fill} style={style} /> },
        { name: 'Delete', component: <Delete size={size} color={color} fill={fill} style={style} /> },
        { name: 'Undelete', component: <Undelete size={size} color={color} fill={fill} style={style} /> },
        { name: 'Remove', component: <Remove size={size} color={color} fill={fill} style={style} /> },
      ],
    },
    {
      group: 'Social',
      items: [
        { name: 'Discord', component: <Discord size={size} color={color} fill={fill} style={style} /> },
        { name: 'FaceBook', component: <FaceBook size={size} color={color} fill={fill} style={style} /> },
        { name: 'GitHub', component: <GitHub size={size} color={color} fill={fill} style={style} /> },
        { name: 'Medium', component: <Medium size={size} color={color} fill={fill} style={style} /> },
        { name: 'Twitter', component: <Twitter size={size} color={color} fill={fill} style={style} /> },
        { name: 'GitCoin', component: <GitCoin size={size} color={color} fill={fill} style={style} /> },
      ],
    },
    {
      group: 'Navigation',
      items: [
        { name: 'ChevronDown', component: <ChevronDown size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronLeft', component: <ChevronLeft size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronRight', component: <ChevronRight size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronUp', component: <ChevronUp size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronsDown', component: <ChevronsDown size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronsLeft', component: <ChevronsLeft size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronsRight', component: <ChevronsRight size={size} color={color} fill={fill} style={style} /> },
        { name: 'ChevronsUp', component: <ChevronsUp size={size} color={color} fill={fill} style={style} /> },
      ],
    },
    {
      group: 'Other Icons',
      items: [
        { name: 'BarChart', component: <BarChart size={size} color={color} fill={fill} style={style} /> },
        { name: 'Internal', component: <InternalLink size={size} color={color} fill={fill} style={style} /> },
        { name: 'External', component: <ExternalLink size={size} color={color} fill={fill} style={style} /> },
        { name: 'GridIcon', component: <GridIcon size={size} color={color} fill={fill} style={style} /> },
        { name: 'Help', component: <HelpCircle size={size} color={color} fill={fill} style={style} /> },
        { name: 'Plus', component: <PlusCircle size={size} color={color} fill={fill} style={style} /> },
        { name: 'Check', component: <CheckCircle size={size} color={color} fill={fill} style={style} /> },
        {
          name: 'CheckYellow',
          component: <CheckCircleYellow size={size} color={color} fill={'yellow'} style={style} />,
        },
        { name: 'X', component: <XCircle size={size} color={color} fill={fill} style={style} /> },
        // { name: 'Plus', component: <Plus size={size} color={color} fill={fill} style={style} /> },
        // { name: 'PlusSquare', component: <PlusSquare size={size} color={color} fill={fill} style={style} /> },
        // { name: 'Settings', component: <Settings size={size} color={color} fill={fill} style={style} /> },
        // { name: 'X', component: <X size={size} color={color} fill={fill} style={style} /> },
        // { name: 'Check', component: <Check size={size} color={color} fill={fill} style={style} /> },
      ],
    },
  ];

  return (
    <Fragment>
      {icons.map((group) => {
        return (
          <Fragment>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <br />
                <h4 style={{ borderBottom: '1px solid' }}>{group.group}</h4>
              </div>
              <div></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr  1fr' }}>
                {group.items.map((item) => {
                  return (
                    <div style={{ display: 'grid', gridTempateRows: '4fr 1fr', justifyItems: 'center' }}>
                      <div>{item.component}</div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};
