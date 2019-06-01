import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCustomer } from '../actions/customerActions';

class AddCustomerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    console.log('hello')
    e.preventDefault();
    const { addCustomer } = this.props;
    addCustomer(this.state);
  }

  render() {
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { address } = this.state;
    return (
      <div>
        <h1>Add Customer</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="First Name" name="firstName" onChange={this.onChange} value={firstName} />
          <input type="text" placeholder="Last Name" name="lastName" onChange={this.onChange} value={lastName} />
          <input type="text" placeholder="Address" name="address" onChange={this.onChange} value={address} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddCustomerForm.propTypes = {
  addCustomer: PropTypes.func.isRequired,
};

export default connect(null, { addCustomer })(AddCustomerForm);
