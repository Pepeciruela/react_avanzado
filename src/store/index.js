import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import *  as reducers from './reducers';
import thunk from 'redux-thunk'
import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

const api = {auth, adverts}

const rootReducer = combineReducers(reducers);

function logger(store){
    return function (next){
        return function(action){
            //console.log('**** mirando la acción ****', action);
            next(action);
            //console.log('**** new state ****', store.getState())
        };
    };
}

// function thunk(store){
//     return function (next) {
//         return function(action) {
//             if(typeof action === 'function'){
//                 return action(store.dispatch, store.getState);
//             }
//             return next(action);
//         }
//     }
// }


const configureStore = (preloadedState, {history}) => {
    const middlewares = [
        routerMiddleware(history),
        thunk.withExtraArgument({api, history}),
        logger,
    ];
    
    const store = createStore(
        combineReducers({...reducers, router: connectRouter(history)}), 
        preloadedState, 
        composeWithDevTools(applyMiddleware(
            thunk.withExtraArgument({api, history}),
            logger)));
    return store;
}

export default configureStore;