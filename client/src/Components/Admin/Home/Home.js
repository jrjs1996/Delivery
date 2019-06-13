import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from './Order';
import { fetchOpenOrders } from '../../../actions/orderActions';

class Home extends Component {

  componentDidMount() {
    const { fetchOpenOrders: action } = this.props;
    action();
  }

  getDate(date) {
    const d = new Date(date);
    return d.toLocaleTimeString("en-CA", { hour: 'numeric', minute: 'numeric' });
  }

  render() {
    const { orders } = this.props;
    const orderCards = orders.map((o) => {
      return (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          orderCreated={this.getDate(o.orderCreated)}
          stage={o.stage}
          id={o._id}
          key={o._id}
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
