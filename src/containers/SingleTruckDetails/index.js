import React from 'react';
import './settings.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class SingleTruckDetails extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      alerts: {
        tphLimit: '',
        mpfLimit: '',
        historicalRange: ''
      },
      commodities: '',
      submittedForm:false
    }
    
    this.submitForm = this.submitForm.bind(this)
    this.updateFormVal = this.updateFormVal.bind(this)

  }

  updateFormVal(e){
    let idVal = e.target.id

    if (idVal === 'commodityPicker'){
        this.setState({commodities: e.target.value})
    }else{
      let curAlerts = this.state.alerts
      curAlerts[idVal] = e.target.value
      this.setState({alerts: curAlerts})
    }
    
  }

  submitForm(e){
    e.preventDefault();
    this.props.dispatch({type: 'updateFromSettings', payload: this.state})
    this.setState({submittedForm: true})
  }

  render(){

    console.log('SINGLE TRUCK rendering state')
    console.log(this.state)
    console.log('SINGLE TRUCK rendering props')
    console.log(this.props)

    if(this.props.truckID){
      return(
        <div className="singleTruckDetailsDiv">
        <div className="headerSpacer"></div>
          <p><b>TRUCK ID:</b> {this.props.truckID}</p>
          <p><b>COMMODITY:</b> {this.props.commodity}</p>
          <p><b>FACILITY MINUTES:</b> {this.props.minutes}</p>
        </div>      
      )
    }else{
      return (
        <div className="settingsWrapper">
          <div className="headerSpacer"></div>
          
         <p>Single Truck Details will go here </p>
        </div>
      );
    }
  	
  
  }
}

const mapStateToProps = state => ({
  truckID: state.selectedTruckID,
  commodity : state.selectedTruckCommodity,
  minutes: state.selectedMins
})

export default connect(mapStateToProps)(SingleTruckDetails);