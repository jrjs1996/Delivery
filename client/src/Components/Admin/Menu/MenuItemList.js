import React from 'react';
import PropType from 'prop-types';

import MenuItem from './MenuItem';

export default function MenuItemList({ menu, onSelect, onDelete }) {
  const menuItems = menu.map(i => (
    <MenuItem
      title={i.title}
      price={i.price}
      description={i.description}
      number={i.menuNumber}
      onSelect={onSelect}
      onDelete={onDelete}
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
