import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomer } from '../../actions/customerActions';


class Customer extends Component {
  componentDidMount() {
    const { getCustomer: getCustomerAction } = this.props;
    getCustomerAction();
  }

  render() {
    const { customer } = this.props;
    return (
      <div>
        <p>
          { customer.firstName }
          { customer.lastName }
        </p>
      </div>
    );
  }
}

Customer.propTypes = {
  getCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customer: state.customers.item,
});

export default connect(mapStateToProps, { getCustomer })(Customer);
