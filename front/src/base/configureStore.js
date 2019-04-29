import { createStore, combineReducers } from 'redux';
import { saveState, loadState } from './storage/local';
import throttle from 'lodash/throttle';

import comments from '../components/comments/reducer';

const persistedState = loadState();
const store = createStore(combineReducers({
	comments,
}), {
	comments:  persistedState ? persistedState.comments : [],
});

store.subscribe(throttle(() => {
	saveState({
		comments: store.getState().comments
	});
}), 1000);

export default store;
