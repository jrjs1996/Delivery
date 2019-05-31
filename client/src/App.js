import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from './logo.svg';
import SideMenu from './Components/SideMenu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: '' };

    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  postData() {
    axios.post('http://localhost:9000/testAPI')
      .then((res) => {
        const msg = res.data;
        this.setState({ apiResponse: msg });
      });
  }

  render() {
    const { apiResponse } = this.state;
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">
            { apiResponse }
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button type="button" onClick={this.postData}>Hello</button>
        </header>
      </div>
    );
  }
}

export default App;
