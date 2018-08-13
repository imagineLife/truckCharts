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
      filteredData: [],
      selectedTruck: '',
      filteredCommodity: [
        {name: 'YC', color: 'cadetblue'},
        {name: 'SB', color: 'green'}
      ],
      toolTipDisplay: 'none'
    }

    this.filterByCommodity = this.filterByCommodity.bind(this);  
    this.redirectToBarPage = this.redirectToBarPage.bind(this);  
    this.mousedOver = this.mousedOver.bind(this);  
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

  redirectToBarPage(data){
    console.log('CLICKED! in TTIFC')
    console.log(data)
    //dispatch to redux
      this.props.dispatch({
        type: 'setSingleTruckDetails', 
        payload: {
          truckID: data.truckID,
          minutes: data.minutes,
          commodity: data.commodity
        }
      })

    this.setState({
      selectedTruck: data.truckID
    })
  }

  componentWillMount(){
    
    //grab vals from store & state
    let storePropsTphLimit = this.props.storeVals.mpfLimit;
    
  }

  //IF the alert line was set in settings, update chart
  //IF redux & local alert status are different,
  // update the redux store with this alert status
  componentDidMount(){

    let thisChartName = 'Minutes In the Facility Per Truck';

    //set Redux data to local 'filteredData' state value
    if(this.state.filteredData !== data && this.state.filteredData !== []){
      // console.log('setting local state filtered data')
      this.setState({filteredData: data})
    }

    //if settings page filtered the data
    if(this.props.storeVals.commodities && this.props.storeVals.commodities !== 'BOTH'){
      
      // console.log('there ARE redux store set commodities')
      
      if (this.state.filteredData.length < 1 || this.state.filteredData === data ){
          let thisFilteredData = data.filter(this.filterByCommodity)
          let thisColor = (thisFilteredData[0].commodity === 'YC') ? 'cadetblue' : 'green'
          this.setState({
            filteredData: thisFilteredData,
            filteredCommodity: [{ name: thisFilteredData[0].commodity, color: thisColor }]
          })
      }
    }

  }

  filterByCommodity(item){
    let chosenComm = this.props.storeVals.commodities;
    if(item.commodity === chosenComm){
      return item
    }
  }

  render() {

    //if selected a truck, redirect
    if(this.state.selectedTruck){
      let text = `/singleTruck/${this.state.selectedTruck}`;
     return(
      <Redirect to={text} />
      )
    }
    
    //set svg dimensions
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 300),
      height: 550
    }

    //max value from data
    const maxDataValue = Math.max(...this.state.filteredData.map(d => d.minutes))

    const xScale = this.xScale
      .domain(this.state.filteredData.map(d => d.truckID))
      .range([this.state.margins.left, svgDimensions.width - this.state.margins.right])


    const yScale = this.yScale
      .domain([0, maxDataValue*1.1])
      .range([svgDimensions.height - this.state.margins.bottom, this.state.margins.top])

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
                r="15" 
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

    let toolTipStyle = {
      'display': this.state.toolTipDisplay,
      'left': (this.state.toolTipDisplay === 'inline-block') ? d3.event.pageX - 150+'px' : 0,
      'top': (this.state.toolTipDisplay === 'inline-block') ? d3.event.pageY - 200+'px' : 0,
    }

    const tooltip = <div className="toolTip" style={toolTipStyle}>Test tooltip</div>

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

        {tooltip}

        {legendItems}


      </svg>
    )
  }
}

const mapStateToProps = state => ({ storeVals: state })

export default ResponsiveWrapper(connect(mapStateToProps)(TruckTimeInFacility))