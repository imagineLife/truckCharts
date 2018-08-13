import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../minutesPerTruck'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import ResponsiveWrapper from '../ResponsiveWrapper'
import './style.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as d3 from 'd3-selection'

class TruckPitInChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand().padding(0.2)
    this.yScale = scaleLinear()
    this.state = {
      labels: [
        {
          type: 'y',
          text : 'minutes',
          textClass : 'yAxisLabelText',
          gWrapperClass : 'yAxisLabelG',
          transformation: 'rotate(-90)'
        },
        // {
        //   type: 'chartTitle',
        //   text : 'Minutes In the Facility Per Truck',
        //   textClass : 'chartTitle',
        //   gWrapperClass : 'chartTitleG',
        //   transformation: ''
        // },
      ],
      margins : { top: 5, right: 20, bottom: 20, left: 60 },
      filteredData: [],
      selectedTruck: '',
      filteredCommodity: [
        {name: 'YC', color: 'cadetblue'},
        {name: 'SB', color: 'green'}
      ],
      toolTipDisplay: 'none'
    }
  }

  calcXPos(string, dims){
    if(string.indexOf('y') > -1){
      return -(dims.height / 2.75)
    }else if(string.indexOf('c') > -1){
      return (dims.width / 2)
    }else{
      return ( dims.width / 2)
    }

  }

  calcYPos(string, dims){
    if(string.indexOf('y') > -1){
      return 20
    }else if(string.indexOf('c') > -1){
      return (dims.height * .05)
    }else{
      return dims.height - 25
    }

  }

  mousedOver(e, data){
    console.log('moused e')
    console.log(e)

    // const pageX=d3.event.pageX;
    // console.log('moused pagex')
    // console.log(pageX)

    // console.log('MOUSED OVER running!!!')
    // console.log(data)
    // this.setState({toolTipDisplay: 'inline-block'})
  }

  render() {
   
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 120
    }

    //max value from data
    const maxDataValue = Math.max(...this.state.filteredData.map(d => d.minutes))

    const xScale = this.xScale
      .domain(this.state.filteredData.map(d => d.truckID))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])


    const yScale = this.yScale
      .domain([0, 60])
      .range([(svgDimensions.height - this.state.margins.bottom), this.state.margins.top])

    const legendItems = this.state.filteredCommodity.map((dc, i) => {

      let thisI = i+1;
      let circleX = (thisI * 100); 
      let circleY = svgDimensions.height - 35; 
      let textX = (thisI * 100) + 20; 
      let textY = svgDimensions.height - 35; 
        return(
            <g className="legendItem" key={dc.name}>
              <circle 
                className="legendCircle" 
                cx={circleX} 
                cy={circleY} 
                x={circleX} 
                y={circleY} 
                r="5" 
                strokeWidth="3" 
                fill={dc.color}>
              </circle>
              <text 
                key={dc.name}
                x={textX} 
                y={textY + 5} 
                className='legendItem' 
                fill='white' >= {dc.name}</text>
            </g>
          )
    })

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
      'height' : 115,
      // 'marginTop': '125px',
      'class': 'trucksPerHourSVG'
    }


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
          data={this.state.filteredData}
          commods={this.state.filteredCommodity}
          maxValue={maxDataValue}
          svgDimensions={svgDimensions}
          mousedOver={(e) => this.mousedOver(e)}
          showBarDetails={this.redirectToBarPage}
        />

        {axisLabels}

      </svg>
    )
  }
}

const mapStateToProps = state => ({ storeVals: state })

export default ResponsiveWrapper(connect(mapStateToProps)(TruckPitInChart))