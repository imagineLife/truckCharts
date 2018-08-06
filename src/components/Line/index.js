import React, { Component } from 'react'
// import { scaleOrdinal } from 'd3-scale'
import * as d3 from 'd3-shape'

export default class Line extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xValue : d => d.hour,
      yValue : d => +d.truckCount
    }
  }

  render() {
    const { scales, data } = this.props //
    const { xScale, yScale } = scales
    // const { height } = svgDimensions

    let lineObj = d3.line()
      .x(d => xScale( this.state.xValue(d) ) + ( xScale.bandwidth() * .5) )
      .y(d => yScale( this.state.yValue(d) ))
      // .curve(d3.curveBasis)

    let thisLineObj = lineObj(data)

    const thisLine = (
      <path
        fill={'none'}
        stroke={'khaki'}
        strokeWidth={8}
        className={'path'}
        d={thisLineObj}
      />
    )

    return (
      <g className='gWrapper'>{thisLine}</g>
    )
  }
}