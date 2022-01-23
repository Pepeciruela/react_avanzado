
import { auth, defaultState } from './reducers';
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './types';

describe('auth', () => {
    test('should manage AUTH_LOGIN_SUCCESS', () => {
        const action = {
            type: AUTH_LOGIN_SUCCESS
        }
        expect(auth(undefined, action)).toBe(true)
    });
    test('should manage AUTH_LOGIN_LOGOUT', () => {
        const action = {
            type: AUTH_LOGOUT
        }
        expect(auth(undefined, action)).toBe(false)
    });
    test('should manage any action', () => {
        const action = {
            type: 'ANY'
        }
        const initialState = true;
        expect(auth(initialState, action)).toBe(initialState)
    });
    test('should manage any action when initial state is undefined ', () => {
        const action = {
            type: 'ANY'
        }
        expect(auth(undefined, action)).toBe(defaultState.auth)
    });
})