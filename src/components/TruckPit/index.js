import React, { Component } from 'react'
import TruckPitInChart from '../TruckPitInChart'
import TruckPitOutChart from '../TruckPitOutChart'
import cornerClicker from '../../imgs/cornerClicker.png'


// import data from '../../minutesPerTruck '
import ResponsiveWrapper from '../ResponsiveWrapper'
import './style.css';
import { connect } from 'react-redux';


class TruckPit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewNumber: 1,
      margins : { top: 75, right: 20, bottom: 100, left: 60 },
    }

    this.updateViewNumber = this.updateViewNumber.bind(this)

  }


  componentDidMount(){
    console.log('CDM viewNumber')
  }

  updateViewNumber(){
    console.log('CLICKED')
    let newNumber = (this.state.viewNumber ===1) ? 2 : 1;
    this.setState({viewNumber: newNumber})
  }

  render() {
    console.log('RENDERING view number')
    console.log(this.state.viewNumber)

    if(this.state.viewNumber ===1){
      return(
        <div className="truckPit">
          <div className="cornerClicker">
            <img src={cornerClicker} onClick={this.updateViewNumber}/>
          </div>
          <h2 className="truckChartH2">Trucks Today:</h2>
          <TruckPitInChart />
          <TruckPitOutChart />
        </div>
      )
    }
    if(this.state.viewNumber ===2){
      return(
        <div className="truckPit total">
          <div className="cornerClicker">
            <img src={cornerClicker} onClick={this.updateViewNumber}/>
          </div>          
          <h2 className="truckChartH2">Trucks Today By Pit:</h2>
          <TruckPitInChart />
          <TruckPitOutChart />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({ storeVals: state })

export default ResponsiveWrapper(connect(mapStateToProps)(TruckPit))