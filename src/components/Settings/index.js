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
        mpfLimit: ''
      },
      submittedForm:false
    }
    
    this.submitForm = this.submitForm.bind(this)
    this.updateFormVal = this.updateFormVal.bind(this)

  }

  updateFormVal(e){
    let idVal = e.target.id
    let curAlerts = this.state.alerts
    curAlerts[idVal] = e.target.value
    this.setState({alerts: curAlerts})

  }

  submitForm(e){
    e.preventDefault();
    this.props.dispatch({type: 'updateAlertLevels', payload: this.state.alerts})
    this.setState({submittedForm: true})

  }

  render(){

    if(this.state.submittedForm){
      return(
        <Redirect to='/charts' />
      )
    }else{
      return (
        <div className="settingsWrapper">
          <div className="headerSpacer"></div>
          <h2> Charts Alert-Levels Settings</h2>
            <form className="settingsForm">
              
              <label className="settingsLabel" htmlFor="tphLimit">Minimum Trucks Per Hour Alert:
                <input 
                  className="settingsInput" 
                  id="tphLimit" 
                  name="tphLimit" 
                  value={this.state.alerts.tphLimit} 
                  onChange={this.updateFormVal}
                />
              </label>

              <label className="settingsLabel" htmlFor="mpfLimit">Maximum Facility Minitues Alert:
                <input 
                    className="settingsInput" 
                    id="mpfLimit" 
                    name="mpfLimit" 
                    value={this.state.alerts.mpfLimit}
                    onChange={this.updateFormVal}
                  />
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