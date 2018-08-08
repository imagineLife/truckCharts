import {createStore} from 'redux';

const initialState = {};

const chartAlertsReducer = function(state=initialState, action){
	if(action.type === 'updateAlertLevels'){
		state = Object.assign({}, {
			tphLimit: action.payload.tphLimit,
			mpfLimit: action.payload.mpfLimit,
			historicalRange: action.payload.historicalRange
		})
	}
	return state;
}

let chartStore = createStore(chartAlertsReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default chartStore;