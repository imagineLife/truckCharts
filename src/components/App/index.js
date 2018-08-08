import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import './App.css';
import Nav from '../Nav';
import ChartWrapper from '../../containers/ChartWrapper';
import Settings from '../../containers/Settings';
import Dashboard from '../../containers/Dashboard';

export default class App extends React.Component {

  render(){

  	return (
  		<Router>
		  	<div className="App">
		      <Nav />
		      <Switch>
			    <Route exact path="/settings" component={Settings} />
          <Route exact path="/charts" component={ChartWrapper} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect from="/*" to="/charts" />
		  	  </Switch>
		  	</div>
	  	</Router>
  	);
  }
}