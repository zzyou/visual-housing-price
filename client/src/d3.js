import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

class D3 extends Component {
    render() {
        // // cannot use sort(), map() methods for array in d3?
        // const statePrice = this.props.myprice;
        // const stateName = this.props.myname;

        let statePrice = [];
        let stateName = [];
        for (let obj of this.props.data) {
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
            .attr("transform", function(d, i) {
                return "translate(" + i * width + ", " + (height - scaledData(d)) + ")"; 
                });

        // .attr("fill", callback), the callback function cannot be defined elsewhere?
        g.append("rect")
        .attr("fill", function(d) {
            if (d < 300) {
                return "green";
            } else if (d < 400) {
            return "yellow";
            } else if (d < 500) {
            return "orange";
            } else if (d >= 500 ) {
            return "red";
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
        .text(function(d) { return stateName[statePrice.indexOf(d)]; });

        return <svg ref={node => this.node = node} width={500} height={500}></svg>;        
    }
};

export default D3;
