import React from 'react'
import { scaleOrdinal } from 'd3-scale'

export default function Bars(props) {

    let colorScale = scaleOrdinal()
      .range(['steelblue', 'green']);

    const { scales, margins, data, svgDimensions } = props
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


          return (
            <rect
              key={barData.hour}
              x={xScale(barData.hour) + (xScale.bandwidth() * .1)}
              y={yScale(totalTruckCountThisHour)}
              height={height - margins.bottom - scales.yScale(totalTruckCountThisHour)}
              width={xScale.bandwidth() * .75}
              fill={'cadetblue'}
              stroke={'gray'}
              onClick={() => props.showBarDetails(barData)}
              onMouseOver={() => props.mousedOver(barData)}
              // fill={'rgba(255,255,255,.5)'}
            />
          )
        }else{
          return ( 
            <rect
              key={barData.truckID}
              x={xScale(barData.truckID)}
              y={yScale(barData.minutes)}
              height={height - margins.bottom - scales.yScale(barData.minutes)}
              width={xScale.bandwidth()}
              fill={colorScale(barData.commodity)}
              onClick={() => props.showBarDetails(barData)}
              onMouseOver={() => props.mousedOver(barData)}
              stroke={'gray'}
              // fill={'rgba(255,255,255,.5)'}
            />
          )
        }

      })
    )

    return (
      <g>{bars}</g>
    )
}