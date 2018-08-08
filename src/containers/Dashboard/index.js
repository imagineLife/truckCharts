import React from 'react';
import './chartWrapper.css'
import TrucksPerHourChart from '../../components/TrucksPerHourChart';
import TruckTimeInFacilityChart from '../../components/TruckTimeInFacilityChart';


export default class ChartWrapper extends React.Component {

  render(){

  	return (
  		<div className="chartWrapper">
    		<div className="headerSpacer"></div>
  			<TrucksPerHourChart />
  			<TruckTimeInFacilityChart />
  			<div className="footerSpacer"></div>
		</div>
  	);
  
  }
}