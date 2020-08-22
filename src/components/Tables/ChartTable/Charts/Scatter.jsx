/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useRef, useEffect } from 'react';

import {
    select,
} from 'd3';

import { calcValue } from 'components/utils';

import './Scatter.css';

import { ChartCanvas } from './ChartCanvas';

export const ScatterChart = (props) => {
    const {
        data,
        chartCtx,
        margin
    } = props;
    const chartCanvas = useRef();

    useEffect(() => {
        const { xScale, yScale } = chartCtx;
        const svg = select(chartCanvas.current);

        svg
            .selectAll('.scatter')
            .data(data)
            .join('circle')
            .attr('cx', (value) => xScale(calcValue(value, chartCtx.rangeCol)))
            .attr('cy', (value) => yScale(calcValue(value, chartCtx.domainCol)))
            .attr('r', 2)
            .attr('class', 'point')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
    }, [data, chartCtx, margin]);

    return (
        <ChartCanvas ref={chartCanvas} {...props}>
            {props.children}
        </ChartCanvas>
    );
};
