import React from 'react';
import './settings.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export class Settings extends React.Component {

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

    console.log('rendering state')
    console.log(this.state)

    if(this.state.submittedForm){
      return(
        <Redirect to='/dashboard' />
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

const mapStateToProps = state => ({storeAlerts: state})

export default connect(mapStateToProps)(Settings);