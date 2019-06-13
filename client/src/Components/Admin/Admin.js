import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SideMenu from '../SideMenu/SideMenu';
import LogoutButton from './LogoutButton';
import CreateOrder from './CreateOrder/CreateOrder';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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

export default function Admin(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <div className="adminPanel">
      <SideMenu />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              News
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
