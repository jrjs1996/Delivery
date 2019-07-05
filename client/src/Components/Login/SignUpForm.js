import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { login } from '../../actions/adminActions';
import { isAuthed } from '../../utils/token';

// TODO: Add error handling

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    const authInfo = isAuthed();
    if (authInfo.tokenInfo && authInfo.isAdmin) {
      const { history } = props;
      history.push('/admin/');
    }

    this.state = {
      username: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.login({ username: 'admin', password: 'admin' });
    this.props.history.push('/admin/');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { login: action, history } = this.props;

    const success = await action(this.state);
    if (success) history.push('/admin/');
  }

  render() {
    const { username, password } = this.state;
    return (
      <div id="signUpFormContainer" onSubmit={this.onSubmit}>
        <form id="signUpForm">
          <span>Admin Login</span>
          <FormInput
            type="text"
            placeholder="username"
            name="username"
            onChange={this.onChange}
            value={username}
          />
          <FormInput
            type="password"
            placeholder="password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
          <FormButton title="Log in" />
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    null,
    { login },
  )(SignUpForm),
);
