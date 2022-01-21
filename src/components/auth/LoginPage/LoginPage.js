import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import { useState, useMemo } from 'react';
//import { useAuthContext } from '../context';
import { login } from '../service';
import LoginForm from './LoginForm';
import useMutation from '../../../hooks/useMutation';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authLoginSucess, uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function LoginPage({ handleLogin, isLoading, error, onResetError }) {
  
  const [value, setValue] = useState({ username: '', password: '' });
  //const { handleLogin } = useAuthContext();
  //const { isLoading, error, execute, resetError } = useMutation(login);
  //const { resetError } = useMutation(login);


  const handleSubmit = async credentials => {
    // execute(credentials)
    //   .then(handleLogin)
    await handleLogin(credentials)
      .then(() => {
        //const { from } = location.state || { from: { pathname: '/' } };
        //history.replace(from);
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

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

const mapStateToProps = state => {
  return getUi(state);
}

const mapDispatchToProps = (dispatch) => {
  return{
    handleLogin: (credentials) => dispatch(authLogin(credentials)),
    onResetError: () => dispatch(uiResetError())
    //handleLogout: () => dispatch(authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
