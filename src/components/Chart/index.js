import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../data'
// import yesterdayData from '../../dataYesterday'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
// import Line from '../Line'
import ResponsiveWrapper from '../ResponsiveWrapper'

class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand().padding(0.5)
    this.yScale = scaleLinear()
    this.calcXPos = this.calcXPos.bind(this)
    this.state = {
      labels: [
        { 
          text : 'Time Of Day',
          textClass : 'xAxisLabelText',
          gWrapperClass : 'xAxisLabelG',
          transformation: ''
        }, 
        {
          text : 'Number Of Trucks',
          textClass : 'yAxisLabelText',
          gWrapperClass : 'yAxisLabelG',
          transformation: 'rotate(-90)'
        }
      ],
      margins : { top: 50, right: 20, bottom: 100, left: 60 }
    }
  }

  calcXPos(string, dims){
    if(string.indexOf('y') > -1){
      return -(dims.height / 2)
    }else{
      return ( dims.width / 2)
    }

  }

  calcYPos(string, dims){
    if(string.indexOf('y') > -1){
      return dims.width * .025
    }else{
      return dims.height - 25
    }

  }

  render() {
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 600
    }

    //max value from data
    const maxDataValue = Math.max(...data.map(d => d.truckCount))

    const xScale = this.xScale
      .domain(data.map(d => d.hour))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])

    const yScale = this.yScale
      .domain([0, maxDataValue])
      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

    const axisLabels = this.state.labels.map((each) => {

      return <AxisLabel
        key={each.text}
        xPos={this.calcXPos(each.textClass, svgDimensions)}
        yPos={this.calcYPos(each.textClass, svgDimensions)}
        labelClass={each.textClass}
        groupClass={each.gWrapperClass}
        textVal={each.text}
        transformation={each.transformation}
      />
    })
    //return
    //SVG
    //  AxesAndMath Component
    //  BARS component
    return (
      <svg 
        width={svgDimensions.width}
        height={svgDimensions.height}
        style={{border: '1px solid blue'}} >

        <AxesAndMath
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          svgDimensions={svgDimensions}
        />
        
        <Bars
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          data={data}
          maxValue={maxDataValue}
          svgDimensions={svgDimensions}
        />

        {axisLabels}

      </svg>
    )
  }
}

export default ResponsiveWrapper(Chart)