import React from 'react';
// import {Link} from 'react-router-dom';
import './alert.css';
import alertImageImport from '../../imgs/alert.ico'
import okImgImport from '../../imgs/ok.png'

import { connect } from 'react-redux';

export function Alert(props) {

	let reduxAlertStatus = props.reduxAlerts.containerAlertStatus;

	let srcStr = (reduxAlertStatus) ? alertImageImport : okImgImport;
	let altTxt = (reduxAlertStatus) ? 'alert!' : 'running smoothly';
	let viewTxt = (reduxAlertStatus) ? 'Alerts' : 'Running Smoothly';

	return(
		<div>
			<img className="bigAlertIcon" src={srcStr} alt={altTxt}/>
			<h2 className="bigAlertText">{viewTxt}</h2>
		</div>
	);	
	
}

const mapStateToProps = state => ({reduxAlerts: state})

export default connect(mapStateToProps)(Alert);