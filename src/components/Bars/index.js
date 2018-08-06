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
      data.map(barData => {
          console.log('barData')
          console.log(barData)
          if(barData.hour){
            return <rect
              key={barData.hour}
              x={xScale(barData.hour)}
              y={yScale(barData.truckCount)}
              height={height - margins.bottom - scales.yScale(barData.truckCount)}
              width={xScale.bandwidth()}
              fill={'rgba(255,255,255,.5)'}
              stroke={'gray'}
              // fill={'rgba(255,255,255,.5)'}
            />
          }else{
            return <rect
              key={barData.truckID}
              x={xScale(barData.truckID)}
              y={yScale(barData.minutes)}
              height={height - margins.bottom - scales.yScale(barData.minutes)}
              width={xScale.bandwidth()}
              fill={this.colorScale(barData.commodity)}
              stroke={'gray'}
              // fill={'rgba(255,255,255,.5)'}
            />
          }
        }
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}