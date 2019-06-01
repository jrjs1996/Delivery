import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import SideMenu from './components/SideMenu/SideMenu';
import Customers from './components/Customers';
import Home from './components/Home';
import store from './store';


class App extends Component {
  constructor() {
    super();
    this.state = { hello: "" };
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  asdfasdf asdfasdf asdfasdf
                </Typography>
              </Toolbar>
            </AppBar>
            <SideMenu />
            <Route path="/" exact component={Home} />
            <Route path="/customers/" component={Customers} />
          </div>
        </Provider>
      </Router>
    );
      
      
  }
}

export default App;
