import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import HomeIcon from '@material-ui/icons/Home';

import SidePanelMenuItem from '../Navigation/SidePanel/SidePanelMenuItem/SidePanelMenuItem';
import Navigation from '../Navigation/Navigation';
import LoginDialog from '../Login/LoginDialog/LoginDialog';
import { login, logout, getCurrentCustomerInfo } from '../../actions/customer/customer';
import { CustomerPropType, OrderPropType } from '../../propTypes';
import SideMenuItem from '../Navigation/SidePanel/SidePanelItem/SidePanelItem';
import Home from './Home/Home';
import SideMenu from '../Navigation/SidePanel/SidePanel';
import { addToCurrentOrder, removeFromCurrentOrder } from '../../actions/order/order';

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
  addToOrderAction,
  currentCustomer,
  currentOrder,
  getInfoAction,
  history,
  loginAction,
  logoutAction,
  match,
  removeFromCurrentOrderAction,
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
      <SideMenu
        anchor="right"
      >
        {Object.keys(currentOrder.items).map(id => (
          <SidePanelMenuItem
            title={currentOrder.items[id].item.title}
            price={currentOrder.items[id].item.price}
            count={currentOrder.items[id].count}
            onAdd={number => addToOrderAction(currentOrder.items[number].item)}
            onRemove={removeFromCurrentOrderAction}
            menuNumber={currentOrder.items[id].item.menuNumber}
          />
        ))}
        <SideMenuItem text={`Total: $${currentOrder.total}`} />
      </SideMenu>
    </div>
  );
}

CustomerComponent.propTypes = {
  addToOrderAction: PropTypes.func.isRequired,
  currentCustomer: CustomerPropType.isRequired,
  currentOrder: OrderPropType.isRequired,
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
    addToOrderAction: addToCurrentOrder,
    getInfoAction: getCurrentCustomerInfo,
    loginAction: login,
    logoutAction: logout,
    removeFromCurrentOrderAction: removeFromCurrentOrder,
  },
)(CustomerComponent);
