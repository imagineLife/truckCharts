import React, { Component } from 'react'
import TruckPitInChart from '../TruckPitInChart'
import TruckPitOutChart from '../TruckPitOutChart'


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

  }


  render() {

    console.log('viewNumber')
    console.log(this.state.viewNumber)

    return (
      <div className="truckPit">
        <h2>Trucks Today:</h2>
        <TruckPitInChart />
        <TruckPitOutChart />
      </div>

    )
  }
}

const mapStateToProps = state => ({ storeVals: state })

export default ResponsiveWrapper(connect(mapStateToProps)(TruckPit))