import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import data from '../../data'
import yesterdayData from '../../dataYesterday'
import lastWeekData from '../../dataLastWeek'
import AxisLabel from '../AxisLabel'
import AxesAndMath from '../Axes'
import Bars from '../Bars'
import Line from '../Line'
import AlertLine from '../AlertLine'
import ResponsiveWrapper from '../ResponsiveWrapper'
import './style.css';
import { connect } from 'react-redux';
import alertImageImport from '../../imgs/alert.ico'

class TrucksPerHourChart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
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
        // {
        //   type: 'chartTitle',
        //   text : 'Trucks Per Hour In Facility',
        //   textClass : 'chartTitle',
        //   gWrapperClass : 'chartTitleG',
        //   transformation: ''
        // }
      ],
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
      alertLevel: 11,
      todaysTruckData: data,
      historicalDataSource: yesterdayData,
      showAlert: false
    }

    this.calculateAlertStatus = this.calculateAlertStatus.bind(this);
    this.showingBarDetails = this.showingBarDetails.bind(this);
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

  mousedOver(data){
    console.log('MOUSED OVER running!!!')
    console.log(data)
  }

  showingBarDetails(data){
    console.log('CLICKED!')
    console.log(data)
    this.setState({
      boldText: (data.truckID) ? data.truckID : data.hour,
      normText: (data.minutes) ? data.minutes : data.trucks[0].truckCount
    })
  }

  calculateAlertStatus(alertNumber,trucks){

    return trucks.some(t => {

      return ( t.trucks[0].truckCount + t.trucks[1].truckCount ) < this.state.alertLevel;

    })
  }

  componentWillMount(){
    let storePropsTphLimit = this.props.storeVals.tphLimit;
    let curAlertLevel = this.state.alertLevel;

    let histDataSrc = this.props.storeVals.historicalRange = 2 ? lastWeekData : yesterdayData;
    if(curAlertLevel !== storePropsTphLimit && storePropsTphLimit){
       this.setState({
        alertLevel: storePropsTphLimit,
        historicalDataSource: histDataSrc
      })
    }
  }

  //IF the alert line was set in settings, update chart
  //IF redux & local alert status are different,
  // update the redux store with this alert status
  componentDidMount(){

    let thisChartName = 'Trucks Per Hour';

    let thisChartAlertStatus = this.calculateAlertStatus(this.state.alertLevel, data)

    let reduxStoreAlertedCharts = this.props.storeVals.alertedCharts;

    //see if this chart alert is in redux Store,
    let isThisChartAlertInReduxStore = (reduxStoreAlertedCharts) 
      ? reduxStoreAlertedCharts.includes(thisChartName)
      : false;
    
    //IF component alert & redux alert dont match
    //Update redux state
    if( thisChartAlertStatus !== isThisChartAlertInReduxStore){
      
      let thisChart = (thisChartAlertStatus) ? thisChartName : ''
      
      this.props.dispatch({
        type: 'setContainerAlertState', 
        payload: {
          chartAlertStatuses: thisChartAlertStatus,
          alertedCharts: thisChart
        }
      })      
    }


    this.setState({showAlert: thisChartAlertStatus})

  }


  //onComponentWillRecieveProps
  //for animations


  render() {
    console.log('RENDERING')
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 550
    }


    //add thisHourTotalTrucks to each data element
    data.map((d, i) => {
      let theseTrucks = d.trucks;
      let totalTrucks = 0;

      theseTrucks.forEach((t, i) => {
        totalTrucks += t.truckCount;
      })

      d.thisHourTotalTrucks = totalTrucks;
      return true;
    })

    //max value from data
    const maxDataValue = Math.max(...data.map(d => d.thisHourTotalTrucks))

    //update scales
    const xScale = this.xScale
      .domain(data.map(d => d.hour))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])
    const yScale = this.yScale
      .domain([0, maxDataValue * 1.1])
      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

    //Make data-driven axis labels
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

    //make alert image 
    const alertImg = (this.state.showAlert === true) ? <image xlinkHref={alertImageImport} x="25" y="25" height="50px" width="50px"/> : null;

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

    //setup 'clicked bar details'
    const clickedDetails = (this.state.boldText) 
    ? <text className="clickedDetails">{this.state.boldText}: {this.state.normText}</text>
    : null

    return (
      <svg 
        style={thisStyleObj} >

        {alertImg}

        <AxesAndMath
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          svgDimensions={svgDimensions}
        />

        {clickedDetails}
        
        <Bars
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          data={data}
          maxValue={maxDataValue}
          svgDimensions={svgDimensions}
          mousedOver={this.mousedOver}
          alertLevel={this.state.alertLevel}
          showBarDetails={this.showingBarDetails}
        />

        <Line
          scales={{ xScale, yScale }}
          margins={this.state.margins}
          data={this.state.historicalDataSource}
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

export default ResponsiveWrapper(connect(mapStateToProps)(TrucksPerHourChart) )