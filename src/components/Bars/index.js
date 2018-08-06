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
          if(barData.hour){

            let thisTruckData = barData.trucks;
            let totalTruckCountThisHour = 0;
            thisTruckData.map((t) => {
              return totalTruckCountThisHour += t.truckCount;
            })


            return <rect
              key={barData.hour}
              x={xScale(barData.hour)}
              y={yScale(totalTruckCountThisHour)}
              height={height - margins.bottom - scales.yScale(totalTruckCountThisHour)}
              width={xScale.bandwidth() * .75}
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