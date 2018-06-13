import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

// todo: tried this method, only for reference now...

class D3 extends Component {
    render() {
        const data = this.props.data;
        let statePrice = [];
        let stateName = [];
        for (let obj of data) {
            statePrice.push(obj.index_nsa);
            stateName.push(obj.place_id);
        }

        const height = 500,
            width = 25;

        const scaledData = scaleLinear()
            .domain([0, Math.max(...statePrice)])
            .range([0, height]);

        const node = this.node;

        const g = select(node)
            .attr("height", height)
            .attr("width", width * statePrice.length)
            .selectAll("g")
            .data(statePrice)
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * width + ", " + (height - scaledData(d)) + ")";
            });

        // .attr("fill", callback), the callback function cannot be defined elsewhere?
        g.append("rect")
            .attr("fill", function (d) {
                if (d < 300) {
                    return "#1a9641";
                } else if (d < 400) {
                    return "#a6d96a";
                } else if (d < 500) {
                    return "#fdae61";
                } else if (d >= 500) {
                    return "#d7191c";
                }
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("height", scaledData)
            .attr("width", width);

        g.append("text")
            .attr("x", 0)
            .attr("y", scaledData)
            .attr("dy", "-0.35em")
            .text(function (d) { return stateName[statePrice.indexOf(d)]; });

        return <svg ref={node => this.node = node} width={500} height={500}></svg>;
    }
};

export default D3;
