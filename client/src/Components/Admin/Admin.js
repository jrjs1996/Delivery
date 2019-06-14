import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SideMenu from '../SideMenu/SideMenu';
import LogoutButton from './LogoutButton';
import CreateOrder from './CreateOrder/CreateOrder';

import { getCurrentAdminInfo } from '../../actions/adminActions';

import Home from './Home/Home';
import Settings from './Settings/Settings';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Admin({ currentAdmin, getCurrentAdminInfo: getInfo }) {
  const classes = useStyles();

  useEffect(() => {
    getInfo();
  }, [getInfo]);
  const { username } = currentAdmin;
  return (
    <div className="adminPanel">
      <SideMenu />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {username}
            </Typography>
            <LogoutButton color="inherit" />
          </Toolbar>
        </AppBar>
        <Route path="/admin/" exact component={Home} />
        <Route path="/admin/createorder/" component={CreateOrder} />
        <Route path="/admin/settings/" component={Settings} />
      </div>
    </div>
  );
}

Admin.propTypes = {
  getCurrentAdminInfo: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(mapStateToProps, { getCurrentAdminInfo })(Admin);
