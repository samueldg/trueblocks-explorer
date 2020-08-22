/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useRef, useEffect } from 'react';

import {
    curveBasis,
    line,
    select,
} from 'd3';

import { calcValue } from 'components/utils';

import { ChartCanvas } from './ChartCanvas';
import './Line.css';

export const LineChart = (props) => {
    const {
        data,
        chartCtx,
        margin
    } = props;
    const chartCanvas = useRef();

    useEffect(() => {
        const svg = select(chartCanvas.current);
        const chartLine = line()
            .x((value) => chartCtx.xScale(calcValue(value, chartCtx.rangeCol)))
            .y((value) => chartCtx.yScale(calcValue(value, chartCtx.domainCol)))
            .curve(curveBasis);

        svg
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', chartLine)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    }, [data, chartCtx, margin]);

    return (
        <ChartCanvas ref={chartCanvas} {...props}>
            {props.children}
        </ChartCanvas>
    );
};
