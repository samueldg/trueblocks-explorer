/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { useSystemCheck } from 'store';
import { currentPage } from 'components/utils';

import { SettingsSystems } from './SettingsSystems';
import { SettingsSkins } from './SettingsSkins';
import { SettingsSchemas } from './SettingsSchemas';

//----------------------------------------------------------------------
export const Settings = () => {
  const apiOkay = useSystemCheck('api');
  const nodeOkay = useSystemCheck('node');
  if (!apiOkay || !nodeOkay) return <SettingsSystems />;
  const subpage = currentPage().subpage;
  switch (subpage) {
    case 'schemas':
      return <SettingsSchemas />;
    case 'skins':
      return <SettingsSkins />;
    case 'status':
    default:
      return <SettingsSystems />;
  }
};

//----------------------------------------------------------------------
export const settingsDefault = [];

//----------------------------------------------------------------------
export const settingsReducer = (state, action) => {
  let ret = state;
  switch (action.type) {
    case 'update':
      ret = action.payload;
      break;
    default:
    // do nothing
  }
  // TODO(tjayrush): this data is on the backend -- we do not store it locally
  // localStorage.setItem('otherState', JSON.stringify(ret));
  return ret;
};
