import { combineReducers } from 'redux';
import { ADVERT_CREATED_SUCESS,ADVERTS_LOADED_FAILURE, ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCESS, ADVERT_LOADED_SUCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_REST_ERROR, ADVERT_CREATED_FAILURE, DELETE_ADVERT_REQUEST, DELETE_ADVERT_SUCESS, DELETE_ADVERT_FAILURE } from './types';

export const defaultState = {
    auth: false,
    adverts: {
        adLoad: null,
        loaded:false,
        data:[],
        deleate: false,
    },
    ui: {
        isLoading: false,
        error: null,
    }
};

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
            return {
                deleate:false,
                adLoad:null,
                loaded:true, 
                data:action.payload}; 
        case ADVERT_LOADED_SUCESS:
            return{
                ...advertsState,
                adLoad: action.payload,
            }
        case ADVERT_CREATED_SUCESS:
            return {...advertsState, data: [...advertsState.data, action.payload]}
        case DELETE_ADVERT_REQUEST:
            return{
                ...advertsState,
                deleate:true,
            }
        case DELETE_ADVERT_SUCESS:
            return{
                ...advertsState,
                deleate:false,
            }
        default:
            return advertsState;
    }
}


export function ui (uiState = defaultState.ui, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
        case ADVERTS_LOADED_REQUEST:
        case DELETE_ADVERT_REQUEST:
            return{
                isLoading: true,
                error: null,
            }
        case AUTH_LOGIN_SUCCESS:
        case ADVERTS_LOADED_SUCESS:
        case ADVERT_LOADED_SUCESS:
        case ADVERT_CREATED_SUCESS:
        case DELETE_ADVERT_SUCESS:
            return{
                isLoading: false,
                error: null,
            }
        case AUTH_LOGIN_FAILURE:
        case ADVERTS_LOADED_FAILURE:
        case ADVERT_CREATED_FAILURE:
        case DELETE_ADVERT_FAILURE:
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



