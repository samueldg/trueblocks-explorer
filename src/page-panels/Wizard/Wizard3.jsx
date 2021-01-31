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
export const Wizard3 = ({ step, handler }) => {
  return (
    <Fragment>
      <WizardHead title="Access to Self-Soveriegn Data" step={step} handler={handler} />
      <WizardBody columns={2}>
        <WizardBox>
          TrueBlocks needs access to three types of data:
          <div style={{ marginLeft: '10px', marginTop: '10px', padding: '5px' }}>
            <div
              style={{
                padding: '5px',
                border: '1px dashed blue',
                display: 'grid',
                gridTemplateColumns: '1fr 4fr 16fr',
              }}
            >
              <div>1. </div>
              <div>Blockchain data</div>
              <div>
                <i>
                  This setting provides access directly to the blockchain node. This can be your own node, a dAppNode or
                  Avado, or a remote node such as Infura, ChainStack or Quiknode. This setting will work with a{' '}
                  <b>full node</b>, a<b>tracing node</b>, or an <b>archive node</b>, however it works best with an
                  archive node.
                </i>
              </div>
              <div></div>
              <div>current setting:</div>
              <div>
                <i>
                  <input
                    style={{ backgroundColor: 'lightyellow' }}
                    type="text"
                    placeholder="http://localhost:8545"
                    maxwidth={245}
                    size={80}
                  />
                </i>
              </div>
            </div>
            <div
              style={{
                padding: '5px',
                border: '1px dashed blue',
                display: 'grid',
                gridTemplateColumns: '1fr 4fr 16fr',
              }}
            >
              <div>2. </div>
              <div>Index data</div>
              <div>x</div>
            </div>
          </div>
          <ol>
            <li>Data directly from the blockchain (that is a provider)</li>
            <li>Index data (so we the program knows where to find the blockchain data for your accounts)</li>
            <li>Accounting data (data derived from the blockchain data to do accounting on your addresses)</li>
          </ol>
        </WizardBox>
      </WizardBody>
    </Fragment>
  );
};
