import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order';
import { fetchOpenOrders } from '../../../actions/orderActions';

class Home extends Component {

  componentWillMount() {
    const { fetchOpenOrders: action } = this.props;
    action();
  }

  render() {
    const { orders } = this.props;
    console.log(orders[orders.length-1]);
    const orderCards = orders.map((o) => {
      return (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          orderCreated={o.orderCreated}
          stage={o.stage}
        />
      );
    });
    return (
      <div>
        {orderCards}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, { fetchOpenOrders })(Home);
