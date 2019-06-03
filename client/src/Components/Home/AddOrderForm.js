import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrder } from '../../actions/orderActions';
import { fetchCustomers } from '../../actions/customerActions';

class AddOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { fetchCustomers } = this.props;
    fetchCustomers();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    console.log(this.state)
    e.preventDefault();
    const { addOrder } = this.props;
    addOrder(this.state);
  }

  render() {
    const { customers } = this.props;
    const customerTags = customers.map(customer => <option key={ customer._id } value={ customer._id }>{ customer.firstName }</option>);
    return (
      <div>
        <h1>Add Order</h1>
        <form onSubmit={this.onSubmit}>
          <select onChange={this.onChange} name="customer">
            { customerTags }
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AddOrderForm.propTypes = {
  addOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers.items,
});

export default connect(mapStateToProps, { addOrder, fetchCustomers })(AddOrderForm);
