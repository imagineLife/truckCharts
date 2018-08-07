import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../minutesPerTruck'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import ResponsiveWrapper from '../ResponsiveWrapper'
import AlertLine from '../AlertLine'
import './style.css';
import { connect } from 'react-redux';

class FacilityMinutesChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand().padding(0.2)
    this.yScale = scaleLinear()
    this.calcXPos = this.calcXPos.bind(this)
    this.state = {
      labels: [
        { 
          type:'x',
          text : 'Truck ID',
          textClass : 'xAxisLabelText',
          gWrapperClass : 'xAxisLabelG',
          transformation: ''
        }, 
        {
          type: 'y',
          text : 'Minutes In Facility',
          textClass : 'yAxisLabelText',
          gWrapperClass : 'yAxisLabelG',
          transformation: 'rotate(-90)'
        },
        {
          type: 'chartTitle',
          text : 'Minutes In the Facility Per Truck',
          textClass : 'chartTitle',
          gWrapperClass : 'chartTitleG',
          transformation: ''
        },
      ],
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
      alertLevel: 45
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

  //IF the alert line was set in settings, update chart
  componentDidMount(){
    let curPropsmpfLimit = this.props.storeVals.mpfLimit;
    let curAlertLevel = this.state.alertLevel;
    if(curAlertLevel !== curPropsmpfLimit && curPropsmpfLimit){
       this.setState({alertLevel: curPropsmpfLimit})
    }

  }

  render() {
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 550
    }

    //max value from data
    const maxDataValue = Math.max(...data.map(d => d.minutes))

    const xScale = this.xScale
      .domain(data.map(d => d.truckID))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])

    const yScale = this.yScale
      .domain([0, maxDataValue*1.1])
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
      'marginTop': '125px',
      'class': 'trucksPerHourSVG'
    }

    //Alert line values
    let lineVals = {
      x1: 212,
      x2: 653,
      y: this.state.alertLevel
    };

    return (
      <svg 
        className="trucksPerHourSVG"
        width={svgDimensions.width}
        height={svgDimensions.height}
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

const mapStateToProps = state => ({ storeVals: state })

export default ResponsiveWrapper(connect(mapStateToProps)(FacilityMinutesChart))