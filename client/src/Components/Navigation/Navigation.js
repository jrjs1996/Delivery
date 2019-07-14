import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  CssBaseline, AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import AuthButton from './AuthButton/AuthButton';
import SideMenu from './SideMenu/SideMenu';

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

export default function Navigation({
  children, history, logout, username,
}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
          <AuthButton color="inherit" loggedIn={username} logoutAction={logout} history={history} />
        </Toolbar>
      </AppBar>
      <SideMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}>
        {children}
      </SideMenu>
    </div>
  );
}

Navigation.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string,
};

Navigation.defaultProps = {
  username: null,
};
