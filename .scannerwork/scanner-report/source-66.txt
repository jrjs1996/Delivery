import React from 'react';

import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import AdminRoute from './components/Admin/AdminRoute';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <AdminRoute path="/admin" component={Admin} />
          <Route path="/login/" component={Login} />
        </div>
      </Provider>
    </Router>
  );
}
