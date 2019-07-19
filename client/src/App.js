import React from 'react';

import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import AdminRoute from './Components/Admin/AdminRoute';
import Customer from './Components/Customer/Customer';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <AdminRoute path="/admin" component={Admin} />
            <Route path="/login/" component={Login} />
            <Route path="/" component={Customer} />
            <ErrorMessage message="asdfdsafsdafdsa" />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}
