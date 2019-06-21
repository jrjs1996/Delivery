import React from 'react';
import PropType from 'prop-types';

import MenuItem from './MenuItem/MenuItem';

export default function MenuItemList({
  menu,
  onSelect,
  onDelete,
  renderItem,
}) {
  const menuItems = menu.map(i => (
    <MenuItem
      title={i.title}
      price={i.price}
      description={i.description}
      number={i.menuNumber}
      onSelect={onSelect}
      onDelete={onDelete}
      _id={i._id}
      key={`item ${i._id}`}
    />
  ));

  return (
    <div>
      {renderItem ? menuItems.map(i => renderItem(i)) : menuItems}
    </div>
  );
}

MenuItemList.propTypes = {
  /** The list of menu items to display */
  menu: PropType.arrayOf(Object).isRequired,
  /** Function to be called when a menu item
   * is clicked on. Will be passed the menu item. */
  onSelect: PropType.func,
  /** Function to be called when the menu items delete
   * button is clicked on. Will not show delete button if
   * this function isn't provided. Passed the menu number
   * of the item */
  onDelete: PropType.func,
  /** Optional render function for each menu item. Passed
   * the menu item. Could be used to wrap the items in links
   * for example. */
  renderItem: PropType.func,
};

MenuItemList.defaultProps = {
  onSelect: null,
  onDelete: null,
  renderItem: null,
};
