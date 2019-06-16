import React from 'react';
import PropType from 'prop-types';

import MenuItem from './MenuItem';

export default function MenuItemList({ menu, onSelect, onDelete }) {
  console.log(menu);
  const menuItems = menu.map(i => (
    <MenuItem
      title={i.title}
      price={i.price}
      description={i.description}
      number={i.menuNumber}
      onSelect={onSelect}
      onDelete={onDelete}
      _id={i._id}
    />
  ));

  return (
    <div>
      {menuItems}
    </div>
  );
}

MenuItemList.propTypes = {
  menu: PropType.arrayOf(Object).isRequired,
  onSelect: PropType.func,
  onDelete: PropType.func,
};

MenuItemList.defaultProps = {
  onSelect: null,
  onDelete: null,
};
