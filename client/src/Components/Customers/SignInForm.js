import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/customerActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { signIn: signInAction } = this.props;
    signInAction(this.state);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Email" name="email" onChange={this.onChange} value={email} />
          <input type="text" placeholder="Password" name="password" onChange={this.onChange} value={password} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(null, { signIn })(SignInForm);
