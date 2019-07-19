import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideMenu from '../../Navigation/SidePanel/SidePanel';
import SideMenuItem from '../../Navigation/SidePanel/SidePanelItem/SidePanelItem';
import SidePanelMenuItem from '../../Navigation/SidePanel/SidePanelMenuItem/SidePanelMenuItem';
import { addToCurrentOrder, removeFromCurrentOrder } from '../../../actions/order/order';
import { OrderPropType } from '../../../propTypes';

function CurrentOrderSidePanel({
  currentOrder,
  addToOrderAction,
  removeFromOrderAction,
}) {
  return (
    <SideMenu
      anchor="right"
    >
      {Object.keys(currentOrder.items).map(id => (
        <SidePanelMenuItem
          title={currentOrder.items[id].item.title}
          price={currentOrder.items[id].item.price}
          count={currentOrder.items[id].count}
          onAdd={number => addToOrderAction(currentOrder.items[number].item)}
          onRemove={removeFromOrderAction}
          menuNumber={currentOrder.items[id].item.menuNumber}
        />
      ))}
      <SideMenuItem text={`Total: $${currentOrder.total}`} />
    </SideMenu>
  );
}

CurrentOrderSidePanel.propTypes = {
  currentOrder: OrderPropType.isRequired,
  addToOrderAction: PropTypes.func.isRequired,
  removeFromOrderAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentOrder: state.orders.currentOrder,
});

export default connect(mapStateToProps, {
  addToOrderAction: addToCurrentOrder,
  removeFromOrderAction: removeFromCurrentOrder,
})(CurrentOrderSidePanel);
