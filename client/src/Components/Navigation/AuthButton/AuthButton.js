import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


export default function AuthButton({
  history,
  loggedIn,
  loginAction,
  logoutAction,
  ...rest
}) {
  if (loggedIn) {
    return (
      <Button
        onClick={() => {
          logoutAction();
          history.push('/');
        }}
      >
        Logout
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        loginAction();
        history.push('/');
      }}
    >
      LogIn
    </Button>
  );
}

AuthButton.propTypes = {
  loggedIn: PropTypes.bool,
  logoutAction: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

AuthButton.defaultProps = {
  loggedIn: false,
};
