import React from 'react';
import { IconTray } from './IconTray';

import './IconTray.css';

export default { title: 'IconTray' };
const recordIconList = [
  'ExternalLink',
  'footer-QuickBooks',
  'footer-CSV',
  'footer-TXT',
  //
];

export const displayIconTray = () => (
  <IconTray iconList={recordIconList} handler={null} record_id={1} alt={{ deleted: false, monitored: false }} />
);
