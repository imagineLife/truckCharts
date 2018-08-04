import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../data'
// import yesterdayData from '../../dataYesterday'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import ResponsiveWrapper from '../ResponsiveWrapper'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {

    //set margins
    const margins = { top: 50, right: 20, bottom: 100, left: 60 }
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 500
    }

    //max value from data
    const maxDataValue = Math.max(...data.map(d => d.minutes))

    const xScale = this.xScale
      .padding(0.5)
      .domain(data.map(d => d.truckID))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxDataValue])
      .range([svgDimensions.height - margins.bottom, margins.top])


    //return
    //SVG
    //  AxesAndMath Component
    //  BARS component
    return (
      <svg 
        width={svgDimensions.width}
        height={svgDimensions.height}
      >
        <AxesAndMath
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxDataValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(Chart)