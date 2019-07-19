import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import Navigation from '../Navigation/Navigation';
import LoginDialog from '../Login/LoginDialog/LoginDialog';
import { login, logout, getCurrentCustomerInfo } from '../../actions/customer/customer';
import { CustomerPropType, OrderPropType } from '../../propTypes';
import SideMenuItem from '../Navigation/SidePanel/SidePanelItem/SidePanelItem';
import Home from './Home/Home';
import { addToCurrentOrder, removeFromCurrentOrder } from '../../actions/order/order';
import CurrentOrderSidePanel from './CurrentOrderSidePanel/CurrentOrderSidePanel';
import Settings from './Settings/Settings';


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
        {
          currentCustomer._id ? (
            <SideMenuItem to={`${match.path}settings/`} text="Settings">
              <SettingsIcon />
            </SideMenuItem>
          ) : null
        }
      </Navigation>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path={match.path} exact component={Home} />
        <Route path={`${match.path}settings/`} component={Settings} />
      </main>
      <LoginDialog
        action={(email, password) => onLogin(email, password, loginAction, setLoginDialogOpen)}
        onClose={() => setLoginDialogOpen(false)}
        open={loginDialogOpen}
      />
      <CurrentOrderSidePanel />
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
  currentOrder: state.orders.currentOrder,
});

export default connect(
  mapStateToProps,
  {
    getInfoAction: getCurrentCustomerInfo,
    loginAction: login,
    logoutAction: logout,
  },
)(CustomerComponent);
