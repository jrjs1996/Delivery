import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from './logo.svg';
import SideMenu from './components/SideMenu';
import Customers from './components/Customers';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = { hello: "" };
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              asdfasdf asdfasdf asdfasdf
            </Typography>
          </Toolbar>
        </AppBar>
        <SideMenu />
        <Home />
      </div>
    );
  }
}

export default App;
