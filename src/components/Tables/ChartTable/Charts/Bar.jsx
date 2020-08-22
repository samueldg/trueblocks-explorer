/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useRef, useEffect } from 'react';

import {
    select,
    scaleBand,
    // transition,
    // easeCubicIn,
} from 'd3';

import { calcValue } from 'components/utils';

import './Bar.css';

import { ChartCanvas } from './ChartCanvas';

export const BarChart = (props) => {
    const {
        data,
        chartCtx,
        margin
    } = props;
    const chartCanvas = useRef();

    useEffect(() => {
        const { yScale } = chartCtx;
        const svg = select(chartCanvas.current);

        const xScale = scaleBand()
            .domain(data.map(d => calcValue(d, chartCtx.rangeCol)))
            .range([0, chartCtx.width])
            .padding(0.5)

        const yValue = (value) => yScale(calcValue(value, chartCtx.domainCol));

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('x', (value) => xScale(calcValue(value, chartCtx.rangeCol)))
            .attr('y', yValue)
            .attr('height', (value) => chartCtx.height - yValue(value))
            // .attr('y', chartCtx.height)
            // .attr('height', 0)
            .attr('width', xScale.bandwidth())
            .attr('class', 'bar')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .on('mouseenter', function () {
                select(this).classed('hover', true);
            })
            .on('mouseleave', function () {
                select(this).classed('hover', false);
            })
        // .transition()
        // .duration(750)
        // .ease(easeCubicIn)
        // .attr('height', (value) => chartCtx.height - yValue(value))
        // .attr('y', yValue);
    }, [data, chartCtx, margin]);

    return (
        <ChartCanvas ref={chartCanvas} {...props}>
            {props.children}
        </ChartCanvas>
    );
};
