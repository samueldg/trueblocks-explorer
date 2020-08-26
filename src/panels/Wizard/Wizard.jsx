/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useState } from 'react';

import { handleClick } from 'components/utils';
import { Wizard1 } from 'panels/Wizard/Wizard1';
import { Wizard2 } from 'panels/Wizard/Wizard2';
import { Wizard3 } from 'panels/Wizard/Wizard3';
import { Wizard4, Wizard5 } from 'panels/Wizard/Wizard4';
import { Wizard6, Wizard7, Wizard8, Wizard9, Wizard10 } from 'panels/Wizard/Wizard4';

import './Wizard.css';

//----------------------------------------------------------------------
export const Wizard = ({ step, handler }) => {
  switch (step) {
    case 2:
      return <Wizard2 step={step} handler={handler} />;
    case 3:
      return <Wizard3 step={step} handler={handler} />;
    case 4:
      return <Wizard4 step={step} handler={handler} />;
    case 5:
      return <Wizard5 step={step} handler={handler} />;
    case 6:
      return <Wizard6 step={step} handler={handler} />;
    case 7:
      return <Wizard7 step={step} handler={handler} />;
    case 8:
      return <Wizard8 step={step} handler={handler} />;
    case 9:
      return <Wizard9 step={step} handler={handler} />;
    case 10:
      return <Wizard10 step={step} handler={handler} />;
    default:
    case 1:
      return <Wizard1 step={step} handler={handler} />;
  }
};

//----------------------------------------------------------------------
export const WizardHead = ({ step, handler, title }) => {
  const str1 = ' (Step ' + step + ' of ' + X + ')';
  const str = <small>{str1}</small>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '9fr 1fr 1fr 11fr', alignItems: 'center' }}>
      <h2>
        {title} {step != 1 ? str : ''}
      </h2>
      {step !== 1 ? (
        <button style={{ height: '2em' }} onClick={(e) => handleClick(e, handler, { type: 'step', payload: step - 1 })}>
          &lt;&lt; Prev
        </button>
      ) : (
        <div> </div>
      )}
      <button style={{ height: '2em' }} onClick={(e) => handleClick(e, handler, { type: 'step', payload: step + 1 })}>
        Next &gt;&gt;
      </button>
    </div>
  );
};

//----------------------------------------------------------------------
export const WizardBody = ({ columns = 4, children }) => {
  const cols = 'repeat(' + columns + ', 1fr)';
  return <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '20px' }}>{children}</div>;
};

//----------------------------------------------------------------------
export const WizardBox = ({ image = '', children }) => {
  return (
    <div style={{ border: '1px dashed brown', padding: '10px' }}>
      {children}
      {image !== '' ? (
        <center>
          <img width="90%" alt="Screen" src={'/assets/wizard/' + image + '.png'} />
        </center>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

//----------------------------------------------------------------------
export const X = Number(1);
