import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/adminActions';


function LogoutButton({ history, action, ...rest }) {
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

export default withRouter(connect(null, { action: logout })(LogoutButton));
