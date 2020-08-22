/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';

import { handleClick } from 'components/utils';
import './Modal.css';

//----------------------------------------------------------------------------
export const Modal = ({ showing, header, buttons = null, handler, children }) => {

  useEffect(() => {
    Mousetrap.bind('esc', (e) => handleClick(e, handler, { type: 'close' }));
    return () => {
      Mousetrap.unbind('esc');
    };
  }, [showing, handler, buttons]);

  if (!showing) return null;
  return (
    <div className='backdrop-style'>
      <div className='modal-style'>
        <h1>{header ? header : 'No Dialog Header'}</h1>
        {children}
        <div className="modal-buttons">
          {buttons || getDefaultButtons(handler)}
        </div>
      </div>
    </div>
  );
};

//----------------------------------------------------------------------------
const defaultButtonsLabels = ['cancel', 'okay'];

//----------------------------------------------------------------------------
const getDefaultButtons = (handler) => defaultButtonsLabels.map((buttonLabel, index) => {
  return (
    <button
      className={index === defaultButtonsLabels.length - 1 ? 'selected' : ''}
      key={buttonLabel + index}
      onClick={(e) => {
        handleClick(e, handler, { type: buttonLabel });
      }}
    >
      {buttonLabel}
    </button>
  );
});

