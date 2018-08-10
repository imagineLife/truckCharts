import React from 'react'
import { scaleOrdinal } from 'd3-scale'

export default function Bars(props) {

    let colorScale = scaleOrdinal()
      .range(['steelblue', 'green']);

    const { scales, margins, data, svgDimensions, alertLevel } = props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    //calculate bar border based on data above/below threshold
    const calcStroke = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return 'red'
      }else{
        return 'gray'
      }
    }

    const calcLessStrokeWidth = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return '5px'
      }else{
        return '1px'
      }
    }

    const calcMoreStrokeWidth = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return '5px'
      }else{
        return '1px'
      }
    }

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
              stroke={calcStroke(barData)}
              strokeWidth={calcLessStrokeWidth(barData)}
              onClick={() => props.showBarDetails(barData)}
              onMouseOver={() => props.mousedOver(barData)}
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
              stroke={calcStroke(barData)}
              strokeWidth={calcMoreStrokeWidth(barData)}
              onClick={() => props.showBarDetails(barData)}
              onMouseOver={() => props.mousedOver(barData)}
              stroke={'gray'}
            />
          )
        }

      })
    )

    return (
      <g>{bars}</g>
    )
}