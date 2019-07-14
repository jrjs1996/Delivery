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
import SideMenuItem from '../Navigation/SideMenu/SideMenuItem/SideMenuItem';
import CreateOrder from './CreateOrder/CreateOrder';
import Customers from './Customers/Customers/Customers';

import { getCurrentAdminInfo, logout } from '../../actions/admin/admin';

import Home from './Home/Home/Home';
import Settings from './Settings/Settings';
import AdminMenu from './Menu/AdminMenu/AdminMenu';
import Navigation from '../Navigation/Navigation';
import { AdminPropType } from '../../propTypes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

function Admin({
  currentAdmin, getInfo, history, logoutAction,
}) {
  const classes = useStyles();

  useEffect(() => {
    getInfo();
  }, [getInfo]);
  const { username } = currentAdmin;
  return (
    <div className={classes.root}>
      <Navigation username={username} logout={logoutAction} history={history}>
        <SideMenuItem to="/admin/" text="Home">
          <HomeIcon />
        </SideMenuItem>
        <SideMenuItem to="/admin/customers/" text="Customers">
          <PersonIcon />
        </SideMenuItem>
        <SideMenuItem to="/admin/createorder/" text="Create Order">
          <ShoppingBasket />
        </SideMenuItem>
        <SideMenuItem to="/admin/settings/" text="Settings">
          <SettingsIcon />
        </SideMenuItem>
        <SideMenuItem to="/admin/menu/" text="Menu">
          <BookIcon />
        </SideMenuItem>
      </Navigation>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/admin/" exact component={Home} />
        <Route path="/admin/createorder/" component={CreateOrder} />
        <Route path="/admin/menu/" component={AdminMenu} />
        <Route path="/admin/settings/" component={Settings} />
        <Route path="/admin/customers/" component={Customers} />
      </main>
    </div>
  );
}

Admin.propTypes = {
  currentAdmin: AdminPropType.isRequired,
  getInfo: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(
  mapStateToProps,
  { getInfo: getCurrentAdminInfo, logoutAction: logout },
)(Admin);
