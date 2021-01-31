/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState } from 'react';

import { handleClick } from 'components/utils';
import { WizardHead, WizardBody, WizardBox, X } from 'page-panels/Wizard/Wizard';

import './Wizard.css';

//----------------------------------------------------------------------
export const Wizard1 = ({ step, handler }) => {
  return (
    <Fragment>
      <WizardHead title={'Welcome to TrueBlocks Account Browser'} step={step} handler={handler} />
      <WizardBody columns={3}>
        <WizardBox>
          <img height="700px" src="/assets/splash.png" alt="splash" />
          <br />
          Before we proceed we must configure your software. This process will take about 15 mintues and requires you to
          make decisions that you may be unfamiliar with. Don't worry, in most cases, you may safely accept the
          defaults. You will be able to edit all of these settings later. The process comprises {X} steps.
        </WizardBox>
      </WizardBody>
    </Fragment>
  );
};
