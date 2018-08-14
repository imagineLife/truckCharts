import {createStore} from 'redux';

const initialState = {
	containerAlertStatus: false,
	alertedCharts: [],
	tphLimit: '',
	mpfLimit: '',
	historicalRange: '',
};

const chartAlertsReducer = function(state=initialState, action){
	if(action.type === 'updateFromSettings'){
		state = Object.assign({}, ...state, {
			tphLimit: action.payload.alerts.tphLimit,
			mpfLimit: action.payload.alerts.mpfLimit,
			historicalRange: action.payload.alerts.historicalRange,
			commodities: action.payload.commodities
		})
	}

	if(action.type === 'setContainerAlertState'){

		//this cleans up an 'undefined' alertedCharts val
		//shorthand for 'undefined' / null true/false !
		const curAlertedCharts = state.alertedCharts || []

		state = { ...state, 
			containerAlertStatus: action.payload.chartAlertStatuses,
			alertedCharts: [ ...curAlertedCharts, action.payload.alertedCharts]
		}

		//ABOVE is the same as 
		// state = Object.assign({}, ...state, {
		// 	containerAlertStatus: action.payload.chartAlertStatuses,
		// 	alertedCharts: [ ...curAlertedCharts, action.payload.alertedCharts]
		// })
	}

	if(action.type === 'setSingleTruckDetails'){
		state = { ...state,
			selectedTruckID: action.payload.truckID,
			selectedTruckCommodity: action.payload.commodity,
			selectedMins: action.payload.minutes
		}
	}

	return state;
}

let chartStore = createStore(chartAlertsReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default chartStore;