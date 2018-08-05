import React, { Component } from 'react'
import { scaleOrdinal } from 'd3-scale'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleOrdinal()
      .range(['steelblue', 'green']);
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.hour}
          x={xScale(datum.hour)}
          y={yScale(datum.truckCount)}
          height={height - margins.bottom - scales.yScale(datum.truckCount)}
          width={xScale.bandwidth()}
          // fill={this.colorScale(datum.commodity)}
          stroke={'gray'}
          fill={'rgba(255,255,255,.5)'}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}