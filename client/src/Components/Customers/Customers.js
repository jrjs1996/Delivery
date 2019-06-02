import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCustomers } from '../../actions/customerActions';
import AddCustomerForm from '../AddCustomerForm';

class Customers extends Component {
  componentWillMount() {
    const { fetchCustomers } = this.props;
    fetchCustomers();
  }

  render() {
    const { customers } = this.props;
    const customerTags = customers.map(customer => <p>{ customer.firstName }</p>);
    return (
      <div>
        <AddCustomerForm />
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
