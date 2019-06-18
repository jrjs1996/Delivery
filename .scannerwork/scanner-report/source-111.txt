import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { fetchOrders, completeOrder } from '../../actions/orderActions';


// TODO: This class is obsolete go over and delete.
class OrderList extends Component {
  componentWillMount() {
    const { fetchOrders } = this.props;
    fetchOrders();

    this.onCompleteOrderClicked = this.onCompleteOrderClicked.bind(this);
  }

  onCompleteOrderClicked(e) {
    const { completeOrder } = this.props;
    completeOrder(e.target.id);
  }

  render() {
    let { orders } = this.props;
    const { excludeCompleted } = this.props;
    
    if (excludeCompleted) orders = orders.filter(order => !order.completed);

    // Will have to get customer name address etc.
    const orderTags = orders.map((order) => {
      if (order.customer == null) return;
      return (
        <p key={order._id}>
        { order.customer.firstName }
        { order.customer.lastName }
        { order.customer.address }
        { order.completed ? <CheckIcon /> : <CloseIcon />}
        <button type="button" key={order._id} id ={order._id} onClick={this.onCompleteOrderClicked}>
          Complete
        </button>
      </p>
      )
    });
 
    return (
      <div>
        { orderTags }
      </div>
    );
  }
}

OrderList.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  completeOrder: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  excludeCompleted: PropTypes.bool,
};

OrderList.defaultProps = {
  excludeCompleted: false,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, { fetchOrders, completeOrder })(OrderList);
