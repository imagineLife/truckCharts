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
    console.log('updatingFormVal!!')
    let idVal = e.target.id
    console.log(`idVal ${idVal}`)

    if (idVal == 'commodityPicker'){
        this.setState({commodities: e.target.value})
    }else{
      let curAlerts = this.state.alerts
      curAlerts[idVal] = e.target.value
      this.setState({alerts: curAlerts})
    }
    
  }

  submitForm(e){
    e.preventDefault();
    this.props.dispatch({type: 'updateAlertLevels', payload: this.state.alerts})
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
          
          <h2>Alert me when...</h2>
            
            <form className="settingsForm">

              <label className="settingsLabel" htmlFor="mpfLimit">Trucks take longer than  
                <input
                    className="settingsInput"
                    id="mpfLimit" 
                    name="mpfLimit" 
                    value={this.state.alerts.mpfLimit}
                    onChange={this.updateFormVal}
                  />
                  minutes in the facility
              </label>

              <label className="settingsLabel" htmlFor="tphLimit">There are less than 
                <input 
                  className="settingsInput"
                  id="tphLimit" 
                  name="tphLimit" 
                  value={this.state.alerts.tphLimit} 
                  onChange={this.updateFormVal}
                />
                trucks per hour
              </label>

              <label 
                className="settingsLabel" 
                htmlFor="historicalRange"
              >Show historical hourly data for 
                
                <select className="dd-wrapper" 
                    id="historicalRange" 
                    name="historicalRange"
                    onChange={this.updateFormVal} >
                    <option className="dd-list-item" value="0"></option>
                    <option className="dd-list-item" onSelect={this.updateFormVal} value="1">Yesterday</option>
                    <option className="dd-list-item" onSelect={this.updateFormVal} value="2">Last Week Averages</option>
                </select>

              </label>

              <label 
                className="settingsLabel" 
                htmlFor="historicalRange"
              >Show commodities:
                
                <select className="dd-wrapper" 
                    id="commodityPicker" 
                    name="commodityPicker"
                    onChange={this.updateFormVal} >
                    <option className="dd-list-item" value="0"></option>
                    <option className="dd-list-item" onSelect={this.updateFormVal} value="SB">SB</option>
                    <option className="dd-list-item" onSelect={this.updateFormVal} value="YC">YC</option>
                    <option className="dd-list-item" onSelect={this.updateFormVal} value="BOTH">Both</option>
                </select>

              </label>

              <input type="button" name="submit" id='submit' onClick={this.submitForm} value="Set Alert Levels" />
            
            </form>   
        </div>
      );
    }
  	
  
  }
}

const mapStateToProps = state => ({storeAlerts: state})

export default connect(mapStateToProps)(Settings);