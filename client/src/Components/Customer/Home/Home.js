import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItemList from '../../General/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menu/menu';
import { MenuItemPropType, OrderPropType } from '../../../propTypes';
import { addToCurrentOrder } from '../../../actions/order/order';

export function HomeComponent({
  addToOrderAction,
  fetchAction,
  menuItems,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <div>
      <MenuItemList
        menu={menuItems}
        onSelect={i => addToOrderAction(menuItems[i])}
        imageMode="onClick"
      />
    </div>
  );
}

HomeComponent.propTypes = {
  addToOrderAction: PropTypes.func.isRequired,
  fetchAction: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(MenuItemPropType).isRequired,
};

const mapStateToProps = state => ({
  menuItems: state.menu.items,
  currentOrder: state.orders.currentOrder,
});

export default connect(mapStateToProps, {
  addToOrderAction: addToCurrentOrder,
  fetchAction: fetchMenu,
})(HomeComponent);
