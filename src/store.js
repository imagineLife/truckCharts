import {createStore} from 'redux';

const initialState = {
	containerAlertStatus: false,
	alertedCharts: '',
	tphLimit: '',
	mpfLimit: '',
	historicalRange: ''
};

const chartAlertsReducer = function(state=initialState, action){
	if(action.type === 'updateAlertLevels'){
		state = Object.assign({}, ...state, {
			tphLimit: action.payload.tphLimit,
			mpfLimit: action.payload.mpfLimit,
			historicalRange: action.payload.historicalRange
		})
	}

	if(action.type === 'setContainerAlertState'){

		state = Object.assign({}, ...state, {
			containerAlertStatus: action.payload.chartAlertStatuses,
			alertedCharts: [state.alertedCharts, action.payload.alertedCharts]
		})
	}

	return state;
}

let chartStore = createStore(chartAlertsReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default chartStore;