import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import MenuItemList from '../MenuItemList/MenuItemList';
import { deleteMenuItem, fetchMenu } from '../../../../actions/menuActions';
import { menuItemPropType } from '../../../../propTypes';

export function AdminMenuItemListComponent({
  menu,
  onSelect,
  onDelete,
  fetchMenu: fetchAction,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <MenuItemList
      menu={menu}
      onSelect={onSelect}
      onDelete={onDelete}
      renderItem={i => <Link to="/admin/menu/additem/" key={i._id}>{i}</Link>}
    />
  );
}

AdminMenuItemListComponent.propTypes = {
  /** Function to be called when one of the menu
   * items is clicked on. Passed the item. */
  onSelect: PropType.func,
  /** Function to be called when the delete button
   * on one of the menu items was clicked. Passed the
   * menu number. */
  onDelete: PropType.func,
  /** Function that populates the menu prop. */
  fetchMenu: PropType.func,
  /** List of menu items. */
  menu: PropType.arrayOf(menuItemPropType).isRequired,
};

AdminMenuItemListComponent.defaultProps = {
  onSelect: () => {},
  onDelete: null,
  fetchMenu: () => {},
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { onDelete: deleteMenuItem, fetchMenu })(AdminMenuItemListComponent);
