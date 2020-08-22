/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { forwardRef } from 'react';

export const ChartCanvas = forwardRef((props, ref) => {
    const {
        width,
        height,
        margin,
        children
    } = props;

    return (
        <div className="at-row chart">
            <svg width={width} height={height} ref={ref}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {children}
                </g>
            </svg>
        </div>
    );
});
