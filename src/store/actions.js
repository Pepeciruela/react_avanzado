//import { login } from '../components/auth/service';
import {getAdvert} from '../components/adverts/service';
import { getAdverts } from '../components/adverts/service';
import { ADVERTS_LOADED_FAILURE, ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_REST_ERROR } from './types';

export function authLoginSucess(){
    return{
        type: AUTH_LOGIN_SUCCESS,
    };
}

export function authLoginRequest(){
    return{
        type: AUTH_LOGIN_REQUEST,
    };
}

export function authLoginFailure(error){
    return{
        type: AUTH_LOGIN_FAILURE,
        error: true,
        payload: error,
    };
}

export function authLogin( credentials){
    return async function(dispatch, getState, {api, history}){
        dispatch(authLoginRequest());
        try{
            await api.auth.login(credentials);
            dispatch(authLoginSucess());
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);
        } catch (error) {
            dispatch(authLoginFailure(error));
        }
    };
}

export function authLogout(){
    return{
        type: AUTH_LOGOUT,
    };
}

export function advertsLoadedSucess(adverts){
    return{
        type: ADVERTS_LOADED_SUCESS,
        payload: adverts,
    }
}

export function advertsLoadedRequest(){
    return{
        type: ADVERTS_LOADED_REQUEST,
    }
}

export function advertsLoadedFailure(error){
    return{
        type: ADVERTS_LOADED_FAILURE,
        error: true,
        payload: error,
    }
}

export function loadAdverts(){
    return async function(dispatch, getState, {api}){
        dispatch(advertsLoadedRequest())
        try{
            const adverts = await api.adverts.getAdverts();
            dispatch(advertsLoadedSucess(adverts))
        } catch(error) {
            dispatch(advertsLoadedFailure(error))
        }
    }
}

export function advertLoadedSucess(advert){
    return{
        type: ADVERTS_LOADED_SUCESS,
        payload: advert,
    }
}

export function loadAdvert(advertId){
    return async function(dispatch, getState, {api}){
        try{
            const advert = await api.advert.getAdvert(advertId)
            dispatch(advertLoadedSucess(advert))
        } catch(error){

        }
    }
}

export function uiResetError () {
return {
    type: UI_REST_ERROR
}
}