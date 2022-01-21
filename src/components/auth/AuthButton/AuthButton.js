import { Link } from 'react-router-dom';
import T from 'prop-types';

import { connect } from 'react-redux';
import { ConfirmationButton } from '../../common';
//import { AuthConsumer } from '../context';
import { logout } from '../service';
import useMutation from '../../../hooks/useMutation';
import { authLoginSucess, authLogout } from '../../../store/actions';

const AuthButton = ({ handleLogout, isLogged }) => {
  const mutation = useMutation(logout);

  const handleLogoutConfirm = async () => {
    await mutation.execute();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const mapDispatchToProps = (dispatch) => {
  return{
    isLogged: () => dispatch(authLoginSucess()),
    handleLogout: () => dispatch(authLogout())
  }
}

const ConnectedAuthButton = connect(undefined, mapDispatchToProps)(AuthButton);

// const ConnectedAuthButton = props => (
//   <AuthConsumer>{auth => <AuthButton {...auth} {...props} />}</AuthConsumer>
// );

export default ConnectedAuthButton;
