import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import *  as reducers from './reducers';

const rootReducer = combineReducers(reducers);

const configureStore = preloadedState => {
    const store = createStore(rootReducer, preloadedState, composeWithDevTools());
    return store;
}

export default configureStore;