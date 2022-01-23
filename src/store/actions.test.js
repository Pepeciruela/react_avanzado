import { ADVERTS_LOADED_SUCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from './types';
import {authLoginRequest, advertsLoadedSucess, authLogin} from './actions'


describe('authLoginRequest', () => {
    test('should return an action with type AUTH_LOGIN_REQUEST', () => {
    const expectedResult = {
        type: AUTH_LOGIN_REQUEST,
    };
    const result = authLoginRequest();
    expect(result).toEqual(expectedResult);
    });
});

describe('advertsLoadedSucess', () => {
    test('should return an action with type ADVERTS_LOADED_SUCESS', () => {
        const adverts = 'adverts'
        const expectedResult = {
            type: ADVERTS_LOADED_SUCESS,
            payload: adverts,
        };
        expect(advertsLoadedSucess(adverts)).toEqual(expectedResult)
    })
})

describe('authLogin', () => {
    const credentials = 'credentials';
    const action = authLogin(credentials)
    describe ('when login api resolves', () => {
        const api = {auth: {login: jest.fn().mockResolvedValue()}};
        const dispatch = jest.fn();
        const getState = () => {};
        const history = {
            location: {},
            replace: jest.fn(),
        };
        test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
            action(dispatch, getState, {api, history});
            expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_REQUEST});
        });
        test('should call api.auth.login', () => {
            action(dispatch, getState, {api, history});
            expect(api.auth.login).toHaveBeenCalledWith(credentials);
        });
        test('should dispatch an AUTH_LOGIN_SUCESS action' , async () => {
            await action(dispatch, getState, {api, history});
            expect(dispatch).toHaveBeenNthCalledWith(2, {type: AUTH_LOGIN_SUCCESS});
        });
        test('should redirect to "/"', async () => {
            await action(dispatch, getState, {api, history});
            expect(history.replace).toHaveBeenCalledWith({ pathname: '/' })
        })

    });
    describe ('when login api rejects', () => {
        const error = 'Unauthorized'
        const api = {auth: {login: jest.fn()}};
        const dispatch = jest.fn();
        const getState = () => {};
        
        test('should dispatch an AUTH_LOGIN_FAILURE action' , async () => {
            api.auth.login.mockRejectedValue(error);
            await action(dispatch, getState, {api, history});
            expect(dispatch).toHaveBeenNthCalledWith(2, {type: AUTH_LOGIN_FAILURE, payload: error, error: true});
        });

    });
})


