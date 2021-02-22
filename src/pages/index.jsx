/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';
import { useContext } from 'react';

import GlobalContext from 'store';

//----------------------------------------------------------------------
// auto-generate: imports
import { Entities } from './Entities/Entities';
import { Monitors } from './Monitors/Monitors';
import { Accounts } from './Accounts/Accounts';
import { Summary } from './Summary/Summary';
import { Explorer } from './Explorer/Explorer';
import { Names } from './Names/Names';
import { Tags } from './Tags/Tags';
import { Signatures } from './Signatures/Signatures';
import { Digests } from './Digests/Digests';
import { Caches } from './Caches/Caches';
import { Other } from './Other/Other';
import { Settings } from './Settings/Settings';
import { Support } from './Support/Support';
// auto-generate: imports

//----------------------------------------------------------------------
export const thePages = {
  // auto-generate: pages
  'entities/': { component: <Entities /> },
  //
  'monitors/': { component: <Monitors /> },
  //
  'accounts/': { component: <Accounts /> },
  //
  'summary/': { component: <Summary /> },
  //
  'tags/': { component: <Tags /> },
  //
  'explorer/': { component: <Explorer /> },
  'explorer/blocks': { component: <Explorer /> },
  'explorer/transactions': { component: <Explorer /> },
  'explorer/receipts': { component: <Explorer /> },
  'explorer/logs': { component: <Explorer /> },
  'explorer/traces': { component: <Explorer /> },
  //
  'names/': { component: <Names /> },
  //
  'signatures/': { component: <Signatures /> },
  'signatures/known': { component: <Signatures /> },
  'signatures/monitored': { component: <Signatures /> },
  'signatures/names': { component: <Signatures /> },
  'signatures/params': { component: <Signatures /> },
  'signatures/cross': { component: <Signatures /> },
  //
  'digests/': { component: <Digests /> },
  'digests/finalized': { component: <Digests /> },
  'digests/staged': { component: <Digests /> },
  'digests/unripe': { component: <Digests /> },
  'digests/columns': { component: <Digests /> },
  //
  'caches/': { component: <Caches /> },
  'caches/blocks': { component: <Caches /> },
  'caches/transactions': { component: <Caches /> },
  'caches/traces': { component: <Caches /> },
  'caches/slurps': { component: <Caches /> },
  'caches/prices': { component: <Caches /> },
  'caches/abis': { component: <Caches /> },
  //
  'other/': { component: <Other /> },
  //
  'settings/': { component: <Settings /> },
  'settings/status': { component: <Settings /> },
  'settings/skins': { component: <Settings /> },
  'settings/schemas': { component: <Settings /> },
  //
  'support/': { component: <Support /> },
  'support/contact': { component: <Support /> },
  'support/keys': { component: <Support /> },
  'support/icons': { component: <Support /> },
  'support/documentation': { component: <Support /> },
  'support/licensing': { component: <Support /> },
  'support/about': { component: <Support /> },
  //
  // auto-generate: pages
};

//----------------------------------------------------------------------
export const theMenu = {
  // auto-generate: menus
  items: [
    {
      label: 'Entities',
      exact: true,
    },
    { label: 'Separator' },
    {
      label: 'Monitors',
      exact: true,
    },
    { label: 'Separator' },
    {
      label: 'Names',
      exact: true,
    },
    { label: 'Separator' },
    {
      label: 'Digests',
      exact: true,
    },
    {
      label: 'Explorer',
      exact: true,
      items: [
        { label: 'Blocks' },
        { label: 'Transactions' },
        { label: 'Receipts' },
        { label: 'Logs' },
        { label: 'Traces' },
      ],
    },
    { label: 'Separator' },
    {
      label: 'Settings',
      exact: true,
      items: [
        { label: 'System Status', route: 'status' },
        { label: 'Separator' },
        { label: 'Tags' },
        { label: 'Signatures' },
        { label: 'Separator' },
        { label: 'Caches' },
        { label: 'Other' },
        { label: 'Separator' },
        { label: 'Skins' },
        { label: 'Schemas' },
      ],
    },
    {
      label: 'Support',
      exact: true,
      items: [
        { label: 'Contact Us', route: 'contact' },
        { label: 'Separator' },
        { label: 'Hot Keys', route: 'keys' },
        { label: 'Icons' },
        { label: 'Documentation' },
        { label: 'Separator' },
        { label: 'Licensing' },
        { label: 'About Us', route: 'about' },
      ],
    },
  ],
  // auto-generate: menus
};

//----------------------------------------------------------------------
function getFieldValue(record, fieldName) {
  if (!record) return '';
  switch (fieldName) {
    case 'id':
      return record.label;
    case 'name':
      return record.label;
    case 'route':
      return 'support/' + record.route;
    default:
      break;
  }
  return record[fieldName];
}

//----------------------------------------------------------------------
// auto-generate: schema
export const menuSchema = [
  {
    name: 'ID',
    selector: 'id',
    type: 'string',
    hidden: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Label',
    selector: 'label',
    type: 'string',
    hidden: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Name',
    selector: 'name',
    type: 'string',
    hidden: true,
  },
  {
    name: 'Route',
    selector: 'route',
    type: 'string',
    hidden: true,
    onDisplay: getFieldValue,
  },
  {
    name: 'Description',
    selector: 'descr',
    type: 'string',
  },
];
// auto-generate: schema

//----------------------------------------------------------------------
export const menusReducer = (state, action) => {
  return state;
};

//----------------------------------------------------------------------
export const useMenus = () => {
  return useContext(GlobalContext).menus;
};
