import React from 'react';

import { connect } from 'react-redux';
import { useState} from 'react';
import LoginForm from './LoginForm';
import { authLogin,uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

export function LoginPage({ handleLogin, isLoading, error, onResetError }) {
  
  const [value, setValue] = useState({ username: '', password: '' });



  const handleSubmit = async value => {
    await handleLogin(value)
      .then(() => {
        console.log('Usuario registrado')
      });
  };


  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p></p>}
      {error && (
        <div onClick={onResetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}


const mapStateToProps = state => {
  return getUi(state);
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleLogin: (credentials) => dispatch(authLogin(credentials)),
    onResetError: () => dispatch(uiResetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
