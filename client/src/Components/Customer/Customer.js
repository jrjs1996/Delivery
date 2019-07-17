import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import HomeIcon from '@material-ui/icons/Home';

import Navigation from '../Navigation/Navigation';
import LoginDialog from '../Login/LoginDialog/LoginDialog';
import { login, logout, getCurrentCustomerInfo } from '../../actions/customer/customer';
import { CustomerPropType } from '../../propTypes';
import SideMenuItem from '../Navigation/SideMenu/SideMenuItem/SideMenuItem';
import Home from './Home/Home';

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
  currentCustomer,
  getInfoAction,
  history,
  loginAction,
  logoutAction,
  match,
}) {
  useEffect(() => {
    getInfoAction();
  }, [getInfoAction]);

  const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Navigation
        history={history}
        login={() => setLoginDialogOpen(true)}
        logout={logoutAction}
        username={currentCustomer.firstName}
      >
        <SideMenuItem to={match.path} text="Home">
          <HomeIcon />
        </SideMenuItem>
      </Navigation>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path={match.path} exact component={Home} />
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
  currentCustomer: CustomerPropType.isRequired,
  getInfoAction: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  loginAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

export default connect(
  mapStateToProps,
  {
    getInfoAction: getCurrentCustomerInfo,
    loginAction: login,
    logoutAction: logout,
  },
)(CustomerComponent);
