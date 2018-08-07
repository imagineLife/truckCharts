import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Redirect,
    Switch
} from 'react-router-dom';
import './App.css';
import Nav from '../Nav';
import ChartWrapper from '../ChartWrapper';

export default class App extends React.Component {

  render(){

  	return (
  		<Router>
		  	<div className="App">
		      <Nav />
		      <Switch>
			    <Route exact path="/settings" component={ChartWrapper} />
			    <Route exact path="/charts" component={ChartWrapper} />
		  	  </Switch>
		  	</div>
	  	</Router>
  	);
  }
}