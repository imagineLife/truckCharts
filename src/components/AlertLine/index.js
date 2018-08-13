import React, { Component } from 'react'

export default class AlertLine extends Component {

  render() {
    const { scales, lineVals } = this.props //
    const { xScale, yScale } = scales

    let firstXScale = xScale.domain()[0];
    let lastXScale = xScale.domain()[xScale.domain().length - 1];

    const thisLine = (
      <line
        fill={'none'}
        stroke={'rgba(255,0,0,.4)'}
        strokeDasharray={'4 0 4'}
        strokeWidth={3}
        className={'alertLine'}
        x1={xScale(firstXScale)}
        x2={xScale(lastXScale)+ ( xScale.bandwidth() * .75 ) }
        y1={yScale(lineVals.y)}
        y2={yScale(lineVals.y)}        
      />
    )

    if(firstXScale !== undefined){
      return (
        <g className='gWrapper'>{thisLine}</g>
      )  
    }else{
      return(
          <g className='gWrapper'></g>
        )
    }
    
  }
}