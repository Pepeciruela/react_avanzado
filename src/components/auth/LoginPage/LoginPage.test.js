import { fireEvent, getByPlaceholderText, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import {LoginPage} from './LoginPage'

describe('Loginpage', () => {
    test('should call handleLogin', () => {
        const history = jest.fn().mockResolvedValue();
        const location = {};
        const handleLogin = jest.fn().mockResolvedValue();
        const email = 'user@example.com'
        const password = '1234'
        const {getByPlaceholderText, getAllByRole, getByText} = render(
        <LoginPage handleLogin={handleLogin} location={location} history = {history}/>);
        const emailField = getByPlaceholderText(/email/);
        const passwordField = getByPlaceholderText('password');
        const submitButton = getAllByRole('button');

        expect(submitButton).toBeDisabled;
        fireEvent.change(emailField, {target: { value: email}} );
        fireEvent.change(passwordField, {target: { value: password}} );
        expect(submitButton).not.toBeDisabled;
    });
})