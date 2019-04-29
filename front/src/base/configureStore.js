import { createStore, combineReducers } from 'redux';
import comments from '../components/comments/reducer';
import { saveState, loadState } from './storage/local';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(combineReducers({
	// videoData,
	comments,
	// user
}), {
	// videoData: {
	// 	videos: [],
	// 	video: { id: 'Embed URL...', embed: false },
	// },
	comments:  persistedState ? persistedState.comments : [],
	// user: {}
	// user: persistedState.user || {}
});

store.subscribe(throttle(() => {
	saveState({
		comments: store.getState().comments
	});
}), 1000);

export default store;
