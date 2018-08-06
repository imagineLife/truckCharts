import React, { Component } from 'react'

export default class AlertLine extends Component {

  render() {
    const { scales, lineVals } = this.props //
    const { xScale, yScale } = scales

    console.log('lineVals')
    console.log(lineVals)
    const thisLine = (
      <line
        fill={'none'}
        stroke={'red'}
        strokeDasharray={'4 0 4'}
        strokeWidth={4}
        className={'alertLine'}
        x1={xScale(lineVals.x1)}
        x2={xScale(lineVals.x2)+ ( xScale.bandwidth() * .75 ) }
        y1={yScale(lineVals.y)}
        y2={yScale(lineVals.y)}        
      />
    )

    return (
      <g className='gWrapper'>{thisLine}</g>
    )
  }
}