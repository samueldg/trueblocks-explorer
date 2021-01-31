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
export const Wizard2 = ({ step, handler }) => {
  return (
    <Fragment>
      <WizardHead title={'Orientation'} step={step} handler={handler} />
      <WizardBody>
        <WizardBox image="wizard_2_01">
          <b>A.</b> To begin, we will spend just a minute orienting you to the various panels that make up TrueBlocks.
          The center panel of the screen is called the <b>Content Panel</b>. Most of the information the application
          presents will be in the <b>Content Panel</b>.
        </WizardBox>
        <WizardBox image="wizard_2_02">
          <b>B.</b> At the top of the display, the <b>Page Header</b> shows a summary of the system's status. Below that
          is the <b>Page Footer</b> which displays links to our social media accounts as well as a link to change
          configuration settings. There is also a console showing activity on the back end.
        </WizardBox>
        <WizardBox image="wizard_2_02">
          <b>C.</b> Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of
          English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a
          convenient tool for mock-ups.
        </WizardBox>
        <WizardBox image="wizard_2_01">
          <b>D.</b> It helps to outline the visual elements of a document or presentation, eg typography, font, or
          layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Nec id
          suscipit incorrupte honestatis.
        </WizardBox>
        <WizardBox image="wizard_2_02">
          <b>E.</b> Et accusata facilisis democritum qui, at eum unum habeo maiorum, est in adhuc suavitate. Et accusata
          facilisis democritum qui, at eum unum habeo maiorum, est in adhuc suavitate. Et accusata facilisis democritum
          qui, at eum unum habeo maiorum, est in adhuc suavitate.
        </WizardBox>
      </WizardBody>
    </Fragment>
  );
};
