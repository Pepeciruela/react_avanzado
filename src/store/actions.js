//import { login } from '../components/auth/service';

import { ADVERTS_LOADED_FAILURE, ADVERTS_LOADED_REQUEST, ADVERTS_LOADED_SUCESS, ADVERT_CREATED_FAILURE, ADVERT_CREATED_SUCESS, ADVERT_LOADED_FAILURE, ADVERT_LOADED_SUCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, DELETE_ADVERT_FAILURE, DELETE_ADVERT_REQUEST, DELETE_ADVERT_SUCESS, UI_REST_ERROR } from './types';
import { getAdverts, getAdvert, createAdvert, deleteAdvert } from '../components/adverts/service';
import { areAdvertsLoaded, getAdvertSelector } from './selectors';

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
        const advertsLoaded = areAdvertsLoaded(getState());
        if(advertsLoaded){
            return;
        }
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
        type: ADVERT_LOADED_SUCESS,
        payload: advert,
    }
}

export function advertLoadedFailure(error){
    return{
        type: ADVERT_LOADED_FAILURE,
        payload: error,
    }
}

export function loadAdvert(advertId){
    return async function(dispatch, getState, {api, history}){
        const advert = getAdverts(getState());
        if (advert.lenght){
            const advert = getAdvertSelector(getState(), advertId);
            dispatch(advertLoadedSucess(advert));
            return;
        }
        try{
            const advert = await api.adverts.getAdvert(advertId)
            dispatch(advertLoadedSucess(advert));
            
        } catch(error){
            dispatch(advertLoadedFailure(error))
            if (error.status === 404){
                history.replace('/404')
            }

        }
    }
}

export function createdAdvertSucces(advert){
    return{
        type: ADVERT_CREATED_SUCESS,
        payload: advert, 
    }
}

export function createdAdvertFailure(error){
    return{
        type: ADVERT_CREATED_FAILURE,
        payload: error, 
    }
}

export function createNewAdvert(advert){
    return async function (dispatch, getState, {api, history}){
        try{
            const createdAdvert = await api.adverts.createAdvert(advert);
            dispatch(createdAdvertSucces(createdAdvert));
            history.replace(`/adverts/${createdAdvert.id}`)
        } catch(error){
            dispatch(createdAdvertFailure(error))

        }
    }
}

export function deleteAdvertRequest(){
    return{
        type: DELETE_ADVERT_REQUEST
    }
}

export function deleteAdvertSucces(){
    return{
        type: DELETE_ADVERT_SUCESS
    }
}

export function deleteAdvertFailure(){
    return{
        type: DELETE_ADVERT_FAILURE
    }
}

export function deleteAd(advertId){
    return async function (dispatch, getState, {api, history}){
        dispatch(deleteAdvertRequest())
        try{
            const advertDelete = await api.adverts.deleteAdvert(advertId);
            dispatch(deleteAdvertSucces());
            history.replace('/adverts');
        }catch(error){
            dispatch(deleteAdvertFailure(error))
            
        }
    }
}

export function uiResetError () {
return {
    type: UI_REST_ERROR
}
}