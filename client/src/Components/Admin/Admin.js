import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SideMenu from '../SideMenu/SideMenu';

export default function Admin() {
  return (
    <div className="adminPanel">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            asdfasdf asdfasdf asdfasdf
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu />
      Admin Panel
    </div>
  );
}
