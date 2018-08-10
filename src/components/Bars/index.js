import React from 'react'
import { scaleOrdinal } from 'd3-scale'

export default function Bars(props) {

    let colorScale = scaleOrdinal()
      .range(['steelblue', 'green']);

    const { scales, margins, data, svgDimensions } = props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    //calculate bar border based on data above/below threshold
    const calcLessStroke = (d) => {
      if(d.thisHourTotalTrucks < props.alertLevel){
        return 'rgb(190,0,22)'
      }else{
        return 'gray'
      }
    }

    const calcMoreStroke = (d) => {
      if(d.minutes > props.alertLevel){
        return 'rgb(190,0,22)'
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
      if(d.minutes > props.alertLevel){
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
              stroke={calcLessStroke(barData)}
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
              stroke={calcMoreStroke(barData)}
              strokeWidth={calcMoreStrokeWidth(barData)}
              onClick={() => props.showBarDetails(barData)}
              onMouseOver={() => props.mousedOver(barData)}
            />
          )
        }

      })
    )

    return (
      <g>{bars}</g>
    )
}