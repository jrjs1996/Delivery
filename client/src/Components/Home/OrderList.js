import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOrders } from '../../actions/orderActions';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

class OrderList extends Component {
  componentWillMount() {
    const { fetchOrders } = this.props;
    fetchOrders();
  }

  render() {
    const { orders } = this.props;
    // Will have to get customer name address etc.
    const orderTags = orders.map(order => (
      <p key={order._id}>
        { order.customer }
        { order.completed ? <CheckIcon /> : <CloseIcon />}
      </p>
    ));
    return (
      <div>
        { orderTags }
      </div>
    );
  }
}

OrderList.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, { fetchOrders })(OrderList);
