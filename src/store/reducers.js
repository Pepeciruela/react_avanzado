import { combineReducers } from 'redux';
import { ADVERTS_LOADED_FAILURE, ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCESS, ADVERT_LOADED_SUCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_REST_ERROR } from './types';

const defaultState = {
    auth: false,
    adverts: [],
    advert:[],
    ui: {
        isLoading: false,
        error: null,
    }
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
        case AUTH_LOGIN_SUCCESS:
            return true;
        case AUTH_LOGOUT:
            return false;
        default:
            return authState;
    }
}

export function adverts(advertsState = defaultState.adverts, action){
    switch (action.type) {
        case ADVERTS_LOADED_SUCESS:
            return action.payload; 
        default:
            return advertsState;
    }
}

export function advert(advertState = defaultState.advert, action){
    switch (action.type) {
        case ADVERT_LOADED_SUCESS:
            return action.payload;
        default:
            return advertState;
    }
}

export function ui (uiState = defaultState.ui, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case ADVERTS_LOADED_REQUEST:
            return{
                isLoading: true,
                error: null,
            }
        case AUTH_LOGIN_SUCCESS:
        case ADVERTS_LOADED_SUCESS:
            return{
                isLoading: false,
                error: null,
            }
        case AUTH_LOGIN_FAILURE:
        case ADVERTS_LOADED_FAILURE:
            return{
                isLoading: false,
                error: action.payload,
            }
        case UI_REST_ERROR:
            return{
                ...uiState,
                error:null,
            }
        default:
            return uiState;
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


