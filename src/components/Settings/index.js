import React from 'react';
import './settings.css'

export default class Settings extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      tphLimit: '',
      mpfLimit: ''
    }
    
    this.submitForm = this.submitForm.bind(this)
    this.updateFormVal = this.updateFormVal.bind(this)

  }

  updateFormVal(e){
    let idVal = e.target.id
    let curState = this.state
    curState[idVal] = e.target.value
    this.setState(curState)

  }

  submitForm(e){
    e.preventDefault();
    console.log('submitted form')
    console.log('this.state')
    console.log(this.state)
  }

  render(){

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
              value={this.state.tphLimit} 
              onChange={this.updateFormVal}
            />
          </label>

          <label className="settingsLabel" htmlFor="mpfLimit">Maximum Facility Minitues Alert:
            <input 
                className="settingsInput" 
                id="mpfLimit" 
                name="mpfLimit" 
                value={this.state.mpfLimit}
                onChange={this.updateFormVal}
              />
          </label>

          <input type="button" name="submit" id='submit' onClick={this.submitForm} value="Set Alert Levels" />
        
        </form>		
		</div>
  	);
  
  }
}