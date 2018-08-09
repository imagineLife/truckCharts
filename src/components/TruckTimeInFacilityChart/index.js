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
import alertImageImport from '../../imgs/alert.ico'

class TruckTimeInFacility extends Component {
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
        // {
        //   type: 'chartTitle',
        //   text : 'Minutes In the Facility Per Truck',
        //   textClass : 'chartTitle',
        //   gWrapperClass : 'chartTitleG',
        //   transformation: ''
        // },
      ],
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
      alertLevel: 45
    }

    this.calculateChartAlertStatus = this.calculateChartAlertStatus.bind(this);    
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
      return 20
    }else if(string.indexOf('c') > -1){
      return (dims.height * .05)
    }else{
      return dims.height - 25
    }

  }

  calculateChartAlertStatus(alertNumber,trucks){
    
    let isHigherThanAlert = false;

    trucks.some(t => {
      let totalMins = t.minutes
    
      if(totalMins > this.state.alertLevel){
        isHigherThanAlert =  true;
        return true;
      }
      return false;
    })

    return isHigherThanAlert;
  }

  componentWillMount(){
    
    //grab vals from store & state
    let storePropsTphLimit = this.props.storeVals.mpfLimit;
    let curAlertLevel = this.state.alertLevel;
    
    //set state alertLevel val if not net
    if(curAlertLevel !== storePropsTphLimit && storePropsTphLimit > 0){
       this.setState({alertLevel: storePropsTphLimit})
    }
  }

  //IF the alert line was set in settings, update chart
  //IF redux & local alert status are different,
  // update the redux store with this alert status
  componentDidMount(){

    let thisChartName = 'Minutes In the Facility Per Truck';

    //make an 'alertStatus' true/false
    let thisChartAlertStatus = this.calculateChartAlertStatus(this.state.alertLevel, data)


    //see if this chart alert is in redux Store,
    let isThisChartAlertInReduxStore = (this.props.storeVals.alertedCharts) 
      ? this.props.storeVals.alertedCharts.includes(thisChartName)
      : false;

    //IF component alert & redux alert dont match
    //Update redux state
    if( thisChartAlertStatus !== isThisChartAlertInReduxStore){
      let thisChart = (thisChartAlertStatus) ? [thisChartName] : ''
      this.props.dispatch({
        type: 'setContainerAlertState', 
        payload: {
          chartAlertStatuses: thisChartAlertStatus,
          alertedCharts: thisChart
        }
      })      
    }
    

    //set container state to show alert on chart
    this.setState({showAlert: thisChartAlertStatus})

  }

  render() {

    // let dataCommodities = [
    //   {name: 'YC', color: 'steelblue'},
    //   {name: 'SB', color: 'green'}
    // ];
    
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

    // const legendItems = dataCommodities.map((dc, i) => {
    //   let circleX = (i + 1) * 50; 
    //   let circleY = (i + 1) - 50; 
    //   let textY = (i + 1) - 150; 

    //     return(
    //         <g className="legendItem" key={dc.name}>
    //           <circle cx="50" cy="50" x={thisXval} y='-50' r="15" strokeWidth="3" fill={dc.color}></circle>
    //           <text key={dc.name} x={thisXval} y='-50' className='legendItem' fill='black' >{dc.name}</text>
    //         </g>
    //       )
    // })

    // console.log('legendItems')
    // console.log(legendItems)
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


    const alertImg = (this.state.showAlert === true) ? <image xlinkHref={alertImageImport} x="25" y="25" height="50px" width="50px"/> : null;

    let thisStyleObj = {
      'width': svgDimensions.width,
      'height' : svgDimensions.height,
      // 'marginTop': '125px',
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
        style={thisStyleObj} >

        {alertImg}

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

export default ResponsiveWrapper(connect(mapStateToProps)(TruckTimeInFacility))