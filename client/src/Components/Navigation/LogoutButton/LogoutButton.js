import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';


export default function LogoutButton({
  history,
  action,
  ...rest
}) {
  return (
    <div>
      <Button
        onClick={() => {
          action();
          history.push('/');
        }}
        {...rest}
      >
        Logout
      </Button>
    </div>
  );
}

LogoutButton.propTypes = {
  action: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};
