import React, { Component, useState, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { login } from '../../actions/adminActions/adminActions';
import { isAuthed } from '../../utils/token';

const onSubmit = async (loginAction, history, username, password) => {
  const success = await loginAction({username, password });
  if (success) history.push('/admin/');
};

function SignUpForm({ history, loginAction }) {
  // Forward to panel if already logged in
  useEffect(() => {
    const authInfo = isAuthed();
    if (authInfo.tokenInfo && authInfo.isAdmin) {
      history.push('/admin/');
    }
  }, [history, loginAction]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      id="signUpFormContainer"
    >
      <span>Admin Login</span>
      <FormInput
        type="text"
        placeholder="username"
        name="username"
        onChange={e => setUsername(e.target.value)}
        value={username}
      />
      <FormInput
        type="password"
        placeholder="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <FormButton title="Log in" onClick={() => onSubmit(loginAction, history, username, password)} />
    </div>
  );
}

SignUpForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  loginAction: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    null,
    { loginAction: login },
  )(SignUpForm),
);
