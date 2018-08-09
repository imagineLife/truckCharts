import {createStore} from 'redux';

const initialState = {
	containerAlertStatus: false,
	alertedCharts: ''
};

const chartAlertsReducer = function(state=initialState, action){
	if(action.type === 'updateAlertLevels'){
		state = Object.assign({}, {
			tphLimit: action.payload.tphLimit,
			mpfLimit: action.payload.mpfLimit,
			historicalRange: action.payload.historicalRange
		})
	}

	if(action.type === 'setContainerAlertState'){
		state = Object.assign({}, {
			containerAlertStatus: action.payload.chartAlertStatuses,
		
			//IF there's an alertedCharts payload, update
			// ELSE nothing
			alertedCharts: (action.payload.alertedCharts) 
				? action.payload.alertedCharts.map((chartName) => {
					let chartNames = [];
					chartNames.push(chartName)
					return chartNames
				})
				: ''
		})
	}
	return state;
}

let chartStore = createStore(chartAlertsReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default chartStore;