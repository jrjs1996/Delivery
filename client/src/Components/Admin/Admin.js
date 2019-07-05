import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import BookIcon from '@material-ui/icons/Book';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { IconButton, CssBaseline } from '@material-ui/core';
import SideMenu from '../SideMenu/SideMenu';
import SideMenuItem from '../SideMenu/SideMenuItem/SideMenuItem';
import LogoutButton from './LogoutButton';
import CreateOrder from './CreateOrder/CreateOrder';
import Customers from './Customers/Customers/Customers';

import { getCurrentAdminInfo } from '../../actions/adminActions';

import Home from './Home/Home/Home';
import Settings from './Settings/Settings';
import AdminMenu from './Menu/AdminMenu/AdminMenu';

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

function Admin({ currentAdmin, getCurrentAdminInfo: getInfo }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    getInfo();
  }, [getInfo]);
  const { username } = currentAdmin;
  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {username}
            </Typography>
            <LogoutButton color="inherit" />
          </Toolbar>
        </AppBar>
        <SideMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
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
        </SideMenu>
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
  getCurrentAdminInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(
  mapStateToProps,
  { getCurrentAdminInfo },
)(Admin);
