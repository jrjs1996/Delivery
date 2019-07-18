import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BookIcon from '@material-ui/icons/Book';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import SideMenuItem from '../Navigation/SidePanel/SidePanelItem/SidePanelItem';
import CreateOrder from './CreateOrder/CreateOrder';
import Customers from './Customers/Customers/Customers';

import { getCurrentAdminInfo, logout } from '../../actions/admin/admin';

import Home from './Home/Home/Home';
import Settings from './Settings/Settings';
import AdminMenu from './Menu/AdminMenu/AdminMenu';
import Navigation from '../Navigation/Navigation';
import { AdminPropType } from '../../propTypes';

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

export function AdminComponent({
  currentAdmin, getInfo, history, logoutAction, match,
}) {
  const classes = useStyles();

  useEffect(() => {
    getInfo();
  }, [getInfo]);
  const { username } = currentAdmin;
  return (
    <div className={classes.root}>
      <Navigation username={username} logout={logoutAction} history={history}>
        <SideMenuItem to={match.path} text="Home">
          <HomeIcon />
        </SideMenuItem>
        <SideMenuItem to={`${match.path}/customers/`} text="Customers">
          <PersonIcon />
        </SideMenuItem>
        <SideMenuItem to={`${match.path}/createorder/`} text="Create Order">
          <ShoppingBasket />
        </SideMenuItem>
        <SideMenuItem to={`${match.path}/settings/`} text="Settings">
          <SettingsIcon />
        </SideMenuItem>
        <SideMenuItem to={`${match.path}/menu/`} text="Menu">
          <BookIcon />
        </SideMenuItem>
      </Navigation>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path={match.path} exact component={Home} />
        <Route path={`${match.path}/createorder/`} component={CreateOrder} />
        <Route path={`${match.path}/menu/`} component={AdminMenu} />
        <Route path={`${match.path}/settings/`} component={Settings} />
        <Route path={`${match.path}/customers/`} component={Customers} />
      </main>
    </div>
  );
}

AdminComponent.propTypes = {
  currentAdmin: AdminPropType.isRequired,
  getInfo: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  logoutAction: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(
  mapStateToProps,
  { getInfo: getCurrentAdminInfo, logoutAction: logout },
)(AdminComponent);
