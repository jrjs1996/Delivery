import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCustomers } from '../../actions/customerActions';
import AddCustomerForm from './AddCustomerForm';
import SignInForm from './SignInForm';
import Customer from './Customer';

class Customers extends Component {
  componentWillMount() {
    const { fetchCustomers: fetchAction } = this.props;
    fetchAction();
  }

  render() {
    const { customers } = this.props;
    const customerTags = customers.map(customer => (
      <p key={customer._id}>{ customer.firstName }</p>
    ));
    return (
      <div>
        <AddCustomerForm />
        <SignInForm />
        <Customer />
        { customerTags }
      </div>
    );
  }
}

Customers.propTypes = {
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers.items,
});

export default connect(mapStateToProps, { fetchCustomers })(Customers);
