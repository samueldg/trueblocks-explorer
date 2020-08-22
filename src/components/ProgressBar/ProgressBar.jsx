/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useEffect, useState } from 'react';

import {
  addActionListener,
  removeListener
} from 'websockets';

import './ProgressBar.css';

//-----------------------------------------------------
export const ProgressBar = (props) => {
  const [progPct, setProgressPct] = useState(0);
  const [finished, setFinished] = useState(false);
  const [op, setOp] = useState('');

  useEffect(() => {
    const listener = addActionListener('progress', ({ id, progress }) => {
      if (id !== props.id) return;

      const toPercent = () => (parseInt(done) / parseInt(total) * 100).toFixed(0);
      const { op, finished, done, total } = progress;
      const prevPct = progPct;
      const progressPercentage = finished ? 0 : toPercent();
      if (progressPercentage !== prevPct) {
        setOp(op);
        setFinished(finished);
        setProgressPct(progressPercentage);
      }
    });
    return () => removeListener(listener);
  });

  const style = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    font: '.9rem Inconsolata, monospace',
    border: finished ? '0px' : '1px solid black',
    backgroundColor: 'black',
    color: 'yellow',
    padding: finished ? '0px' : '3px',
    alignContent: 'center'
  };
  const item = (props.text ? <div style={style}>{op}</div> : finished ? null : <progress max="100" value={progPct}></progress>);
  return (
    <div className={`progress-wrapper ${props.className}`}>
      {item}
    </div>
  );
}
