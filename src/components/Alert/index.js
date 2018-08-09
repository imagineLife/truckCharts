import React from 'react';
// import {Link} from 'react-router-dom';
import './alert.css';
import { connect } from 'react-redux';

export function Alert(props) {

	let reduxAlertStatus = props.reduxAlerts.containerAlertStatus;
	console.log('alert component props.reduxAlerts.containerAlertStatus')
	console.log(reduxAlertStatus)
	console.log('- - - -')
	if(reduxAlertStatus){
		return(
			<div>
				<p>TRUE Alert Component</p>
			</div>
		);	
	}else{
		return(
			<div>
				<p>FALSE Alert Component</p>
			</div>
		);
	}
	
}

const mapStateToProps = state => ({reduxAlerts: state})

export default connect(mapStateToProps)(Alert);