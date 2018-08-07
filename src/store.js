import {createStore} from 'redux';

const initialState = {
	thereis: 'noStateYet'
}

const chartAlertsReducer = (state=initialState, action){
	if(action.type === 'updateAlertLevels'){
		state = Object.assign({}, {alertLeves: action.payload })
	}
	return state;
}

let chartStore = createStore(chartAlertsReducer);

chartStore.subscribe(() => 'redux store changing', chartStore.getState())

export default chartStore;