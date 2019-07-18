import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Hidden } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideMenu({
  anchor,
  children,
  mobileOpen,
  setMobileOpen,
}) {
  const classes = useStyles();
  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor={anchor}
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Divider />
          <List>{children}</List>
          <Divider />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
          anchor={anchor}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>{children}</List>
          <Divider />
        </Drawer>
      </Hidden>
    </nav>
  );
}

SideMenu.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
};

SideMenu.defaultProps = {
  anchor: 'left',
};

export default SideMenu;
