/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { getApiUrl, useToggles } from 'store';
import { Panel } from 'components/';
import { currentPage, fetchFromServer, handleClick } from 'components/utils';
import HelpCircle from 'assets/icons/HelpCircle';

import './HelpPanel.css';

//----------------------------------------------------------------------
export const HelpPanel = () => {
  const helpDispatch = useToggles().dispatch;
  const expanded = useToggles().state.help;
  const [help, setHelp] = useState('');

  const { page, subpage } = currentPage();
  useEffect(() => {
    const url = getApiUrl('help/');
    const helpURL = url + page + (subpage !== '' ? '/' + subpage : '') + '.md';
    fetchFromServer(helpURL, setHelp, setHelp);
  }, [page, subpage]);

  const action = { type: 'help' };
  const helpIcon = <HelpCircle fill="forestgreen" color="#333" onClick={(e) => handleClick(e, helpDispatch, action)} />;

  return (
    <Panel title="Help" topIcon={helpIcon} type="help" expanded={expanded}>
      {expanded && (
        <Fragment>
          <ReactMarkdown source={help} />
          <MoreHelp />
        </Fragment> //
      )}
    </Panel>
  );
};

//----------------------------------------------------------------------
const MoreHelp = () => {
  const apiUrl = 'https://app.gitbook.com/@trueblocks-llc/s/trueblocks-api-docs/';
  const guideUrl = 'https://app.gitbook.com/@trueblocks-llc/s/trueblocks-explorer-users-guide/';
  //'http://' + (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost') + ':8090/docs';
  return (
    <Fragment>
      <h4>Other</h4>
      <ul>
        <li>
          <a href={guideUrl} target="_blank" rel="noopener noreferrer">
            Users Guide
          </a>
        </li>
        <li>
          <a href={apiUrl} target="_blank" rel="noopener noreferrer">
            API Docs
          </a>
        </li>
      </ul>
    </Fragment>
  );
};
