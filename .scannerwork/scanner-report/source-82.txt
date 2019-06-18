import React, { Component } from 'react';
import SignUpHeader from './SignUpHeader';
import SignUpForm from './SignUpForm';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div id="signUpContainer">
        <SignUpHeader title="Delivery" />
        <SignUpForm />
      </div>
    );
  }
}
