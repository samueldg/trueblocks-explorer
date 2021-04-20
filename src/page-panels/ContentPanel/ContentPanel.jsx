/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, createContext, useState } from 'react';

import { useSystemCheck } from 'store';

import { useToggles } from 'store';
import { thePages } from 'pages';
import { Settings } from 'pages/Settings/Settings';
import { Panel } from 'components/';
import { currentPage, handleClick } from 'components/utils';
import { Wizard, X } from 'page-panels/Wizard/Wizard';

import './ContentPanel.css';

//----------------------------------------------------------------------
export const ContentPanel = () => {
  const { page, subpage } = currentPage();
  let title = decodeURIComponent((page + (subpage ? ' : ' + subpage : '')).replace(/\+/g, '%20'));
  title = title === 'summary' ? 'Summary of Accounts for John Q. Public (8 accounts)' : title;
  const expanded = useToggles().state.content;
  return (
    <Panel title={title} type="content" expanded={expanded}>
      {expanded && (
        <div className="content-container">
          <InnerContent />
        </div>
      )}
    </Panel>
  );
};

//----------------------------------------------------------------------
export var PageContext = createContext({});
export const InnerContent = () => {
  const [step, setStep] = useState(Number(localStorage.getItem('wizardStep') || 1));
  const notReady = !useSystemCheck('api');
  const { page, subpage } = currentPage();

  const nextWizard = (action) => {
    switch (action.type) {
      case 'reset':
        localStorage.setItem('wizardStep', 1);
        setStep(1);
        break;
      case 'step':
        localStorage.setItem('wizardStep', Number(action.payload));
        setStep(action.payload);
        break;
      default:
        break;
    }
  };

  if (step <= X) {
    return <Wizard step={step} handler={nextWizard} />;
  }

  if (notReady)
    return (
      <Fragment>
        {<div onClick={(e) => handleClick(e, nextWizard, { type: 'reset' })}>wizardStep: {step}</div>}
        <Settings />
      </Fragment>
    );

  let loc = page + '/' + subpage;
  let ret = thePages[loc];
  if (!ret) {
    loc = loc.replace('settings/', '') + '/';
    ret = thePages[loc];
  }
  const stt = step < 2 ? <div onClick={(e) => handleClick(e, nextWizard, { type: 'reset' })}>wizardStep: {step}</div> : <Fragment></Fragment>;
  return (
    <PageContext.Provider value={[]}>
      {stt}
      {ret ? ret.component : <div className='warning'>Missing Inner Content</div>}
    </PageContext.Provider>
  );
};
