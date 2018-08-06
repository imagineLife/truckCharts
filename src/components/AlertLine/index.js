import React, { Component } from 'react'

export default class Line extends Component {

  render() {
    const { scales, data } = this.props //
    const { xScale, yScale } = scales

    const thisLine = (
      <line
        fill={'none'}
        stroke={'red'}
        strokeDasharray={'4 0 4'}
        strokeWidth={4}
        className={'alertLine'}
        x1={xScale("9:00")}
        x2={xScale("4:00")+ xScale.bandwidth()}
        y1={yScale(data)}
        y2={yScale(data)}        
      />
    )

    return (
      <g className='gWrapper'>{thisLine}</g>
    )
  }
}