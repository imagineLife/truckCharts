import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './float-grid.css';
import { Provider } from 'react-redux';
import chartStore from './store';

ReactDOM.render(
	<Provider store={chartStore}>
  		<App />
  	</Provider>,
  document.getElementById('root'),
);
