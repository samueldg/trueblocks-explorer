/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { getIcon } from 'pages/utils';
import { handleClick } from 'components/utils';
import { useMonitorMap } from 'store/status_store';
import { useToast } from "components/Toast";

//--------------------------------------------------------------
export const Displayable = ({ display, copyable = null, viewable = null, handler }) => {
  const monitorMap = useMonitorMap();
  if (!monitorMap) return display;
  if (!copyable) return display;
  return (
    <div style={{ display: 'flex' }}>
      {display}
      {copyable && <CopyIcon text={copyable} handler={handler} />}
      {viewable && monitorMap[viewable] && <ViewIcon text={viewable} handler={handler} />}
    </div>
  );
};

//--------------------------------------------------------------
const ViewIcon = ({ text, handler }) => {
  const index = text;
  return (
    <div style={{ paddingLeft: '5px' }} onClick={(e) => handleClick(e, handler, { type: 'View', record_id: text })}>
      {getIcon(index, 'View', false, false, 12)}
    </div>
  );
};

//--------------------------------------------------------------
const CopyIcon = ({ text, handler }) => {
  const [copyToClipboard] = useCopyToClipboard();
  const index = text;
  return (
    <div style={{ paddingLeft: '5px' }} onClick={(e) => copyToClipboard(e, text, handler)}>
      {getIcon(index, 'Copy', false, false, 12)}
    </div>
  );
};

//--------------------------------------------------------------
const useCopyToClipboard = () => {
  const { addToast } = useToast();
  const copyToClipboard = (e, text, handler) => {
    if (typeof text == 'string' || typeof text == 'number') {
      
      const element = document.createElement('textarea'); // create textarea HTML element
      element.value = text; // add the text to be copied to the element
      document.body.appendChild(element); // add element to DOM
      element.select(); // select the text
      document.execCommand('copy'); // execute copy command
      document.body.removeChild(element); // remove element from DOM
      addToast('Copied');
      if (handler) handleClick(e, handler, { type: 'copied', text: text });
    } else {
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a valid string or number.`);
      if (handler) handleClick(e, handler, { type: 'not-copied', text: text });
    }
  };
  return [copyToClipboard];
};
