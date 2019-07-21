import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  addToCurrentOrder,
  removeFromCurrentOrder,
  createOrder,
} from '../../../actions/order/order';
import { OrderPropType } from '../../../propTypes';
import SideMenu from '../../Navigation/SidePanel/SidePanel';
import SideMenuItem from '../../Navigation/SidePanel/SidePanelItem/SidePanelItem';
import SidePanelMenuItem from '../../Navigation/SidePanel/SidePanelMenuItem/SidePanelMenuItem';
import SubmitOrderDialog from './SubmitOrderDialog/SubmitOrderDialog';

function CurrentOrderSidePanel({
  addToOrderAction,
  createOrderAction,
  currentCustomer,
  currentOrder,
  hideOnEmpty,
  removeFromOrderAction,
}) {
  const [submitOpen, setSubmitOpen] = useState(false);
  if (hideOnEmpty && Object.entries(currentOrder.items).length === 0) return null;
  return (
    <SideMenu anchor="right">
      {Object.keys(currentOrder.items).map(id => (
        <SidePanelMenuItem
          count={currentOrder.items[id].count}
          menuNumber={currentOrder.items[id].item.menuNumber}
          onAdd={number => addToOrderAction(currentOrder.items[number].item)}
          onRemove={removeFromOrderAction}
          price={currentOrder.items[id].item.price}
          title={currentOrder.items[id].item.title}
        />
      ))}
      <SideMenuItem text={`Total: $${currentOrder.total}`} />
      <Button variant="contained" color="secondary" onClick={() => setSubmitOpen(!submitOpen)}>
        Submit
      </Button>
      <SubmitOrderDialog
        action={createOrderAction}
        currentCustomer={currentCustomer}
        currentOrder={currentOrder}
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
      />
    </SideMenu>
  );
}

CurrentOrderSidePanel.propTypes = {
  /** Action to an an item to the current order */
  addToOrderAction: PropTypes.func.isRequired,
  /** The currently logged in customer */
  currentCustomer: PropTypes.func.isRequired,
  /** The current order */
  currentOrder: OrderPropType.isRequired,
  /** Action to create an order */
  createOrderAction: PropTypes.func.isRequired,
  /** Hide the panel when there are no items in the cart. */
  hideOnEmpty: PropTypes.bool.isRequired,
  /** Remove an item from the current order. */
  removeFromOrderAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentOrder: state.orders.currentOrder,
  currentCustomer: state.customers.currentCustomer,
});

export default connect(
  mapStateToProps,
  {
    addToOrderAction: addToCurrentOrder,
    createOrderAction: createOrder,
    removeFromOrderAction: removeFromCurrentOrder,
  },
)(CurrentOrderSidePanel);
