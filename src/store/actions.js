import { ADVERTS_LOADED, AUTH_LOGIN, AUTH_LOGOUT } from './types'

export function authLogin(){
    return{
        type: AUTH_LOGIN,
    };
}

export function authLogout(){
    return{
        type: AUTH_LOGOUT,
    };
}

export function advertsLoaded(adverts){
    return{
        type: ADVERTS_LOADED,
        payload: adverts,
    }
}