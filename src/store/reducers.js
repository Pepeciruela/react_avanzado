import { combineReducers } from 'redux';
import { ADVERTS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from './types';

const defaultState = {
    auth: false,
    adverts: [],
};

/*const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
        return {...state, auth: true};

        case AUTH_LOGOUT:
            return {...state, auth: false};

        case ADVERTS_LOADED:
            return {...state, adverts: action.payload}; 
    
        default:
            return state;
    }
};*/

export function auth(authState = defaultState.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return true;
        case AUTH_LOGOUT:
            return false;
        default:
            return authState;
    }
}

export function adverts(advertsState = defaultState.adverts, action){
    switch (action.type) {
        case ADVERTS_LOADED:
            return action.payload; 
        default:
            return advertsState;
    }
}

/*function combinedReducer(state = defaultState, action) {
    return {
        auth: auth(state.auth, action),
        adverts: adverts(state.adverts, action),
    }
}*/

/*const combineReducerWithRedux = combineReducers ({
    auth: auth,
    adverts: adverts,
});*/


