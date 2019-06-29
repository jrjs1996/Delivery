import React from 'react';
import PropType from 'prop-types';
import shortid from 'shortid';
import MenuItem from './MenuItem/MenuItem';

export default function MenuItemList({
  menu,
  onSelect,
  onDelete,
  render,
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
      _key={i._id}
      key={shortid.generate()}
    />
  ));

  return (
    <div>
      {render ? menuItems.map(i => render(i)) : menuItems}
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
  render: PropType.func,
};

MenuItemList.defaultProps = {
  onSelect: null,
  onDelete: null,
  render: null,
};
