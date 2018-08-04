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
          key={datum.truckID}
          x={xScale(datum.truckID)}
          y={yScale(datum.minutes)}
          height={height - margins.bottom - scales.yScale(datum.minutes)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.commodity)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}