/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';

import { ButtonCaddie, ProgressBar } from 'components';
import { Spinner } from 'assets/spinners';
import { useStatus } from 'store';

export const PageCaddie = ({ caddieName, caddieData, current, useProgress = false, handler }) => {
  const loading = useStatus().state.loading;
  const spinner = useProgress ? <ProgressBar id="export" /> : <Spinner showing={loading} which="ellipsis" size={24} />;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr' }}>
      <ButtonCaddie name={caddieName} buttons={caddieData} current={current} actionType="select-tag" handler={handler} />
      <div style={{ height: '40px', justifySelf: 'end' }}>
      {spinner}
      </div>
    </div>
  );
};
