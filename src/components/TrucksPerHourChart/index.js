import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../data'
import yesterdayData from '../../dataYesterday'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import Line from '../Line'
import AlertLine from '../AlertLine'
import ResponsiveWrapper from '../ResponsiveWrapper'
import './style.css';

class TrucksPerHourChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand().padding(0.2)
    this.yScale = scaleLinear()
    this.calcXPos = this.calcXPos.bind(this)
    this.state = {
      labels: [
        { 
          type:'x',
          text : 'Time Of Day',
          textClass : 'xAxisLabelText',
          gWrapperClass : 'xAxisLabelG',
          transformation: ''
        }, 
        {
          type: 'y',
          text : 'Number Of Trucks',
          textClass : 'yAxisLabelText',
          gWrapperClass : 'yAxisLabelG',
          transformation: 'rotate(-90)'
        },
        {
          type: 'chartTitle',
          text : 'Trucks Per Hour In Facility',
          textClass : 'chartTitle',
          gWrapperClass : 'chartTitleG',
          transformation: ''
        }
      ],
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
      alertLevel: 10,
      todaysTruckData: data
    }
  }

  calcXPos(string, dims){
    if(string.indexOf('y') > -1){
      return -(dims.height / 2)
    }else if(string.indexOf('c') > -1){
      return (dims.width / 2)
    }else{
      return ( dims.width / 2)
    }

  }

  calcYPos(string, dims){
    if(string.indexOf('y') > -1){
      return dims.width * .02
    }else if(string.indexOf('c') > -1){
      return (dims.height * .05)
    }else{
      return dims.height - 25
    }

  }

  render() {
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 550
    }


    //Get max truck-count values from data
    const truckCountsFromData = [];
    data.map((d,i) => {
      let theseTrucks = d.trucks;
      let thisTruckTotal = 0;
      return theseTrucks.forEach((t) => {
        thisTruckTotal += t.truckCount;
        let thisObj = {ind: i, thisTotal: thisTruckTotal}
        truckCountsFromData.push(thisObj)

      })
    })

    //max value from data
    const maxDataValue = Math.max(...truckCountsFromData.map(d => d.thisTotal))

    const xScale = this.xScale
      .domain(data.map(d => d.hour))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])

    const yScale = this.yScale
      .domain([0, maxDataValue])
      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

    const axisLabels = this.state.labels.map((each) => {

      return <AxisLabel
        key={each.text}
        xPos={this.calcXPos(each.type, svgDimensions)}
        yPos={this.calcYPos(each.type, svgDimensions)}
        labelClass={each.textClass}
        groupClass={each.gWrapperClass}
        textVal={each.text}
        transformation={each.transformation}
      />
    })

    let thisStyleObj = {
      'width': svgDimensions.width,
      'height' : svgDimensions.height,
      'class': 'trucksPerHourSVG'
    }

    //Alert line values
    let lineVals = {
      x1: '9:00',
      x2: '4:00',
      y: this.state.alertLevel
    };

    return (
      <svg 
        style={thisStyleObj} >

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

        <Line
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          data={yesterdayData}
          maxValue={maxDataValue}
          svgDimensions={svgDimensions}
        />

        <AlertLine
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          lineVals={lineVals}
          svgDimensions={svgDimensions}
        />

        {axisLabels}

      </svg>
    )
  }
}

export default ResponsiveWrapper(TrucksPerHourChart)