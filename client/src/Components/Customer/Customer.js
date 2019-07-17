import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Navigation from '../Navigation/Navigation';
import { login, logout } from '../../actions/customer/customer';
import LoginDialog from '../Login/LoginDialog/LoginDialog';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

const onLogin = (email, password, loginAction, setLoginDialogOpen) => {
  loginAction({ email, password });
  setLoginDialogOpen(false);
};

export function CustomerComponent({
  history, match, loginAction, currentCustomer, logoutAction
}) {
  const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Navigation
        history={history}
        login={() => setLoginDialogOpen(true)}
        logout={logoutAction}
        username={currentCustomer.firstName}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
      <LoginDialog
        action={(email, password) => onLogin(email, password, loginAction, setLoginDialogOpen)}
        onClose={() => setLoginDialogOpen(false)}
        open={loginDialogOpen}
      />
    </div>
  );
}

CustomerComponent.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

export default connect(mapStateToProps, { loginAction: login, logoutAction: logout })(CustomerComponent);
