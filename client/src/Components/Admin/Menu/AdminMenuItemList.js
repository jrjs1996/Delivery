import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import MenuItemList from './MenuItemList/MenuItemList';
import { deleteMenuItem, fetchMenu } from '../../../actions/menuActions';
import { menuItemPropType } from '../../../propTypes';

function AdminMenuItemList({
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
      renderItem={i => <Link to="/admin/menu/additem/">{i}</Link>}
    />
  );
}

AdminMenuItemList.propTypes = {
  onSelect: PropType.func,
  onDelete: PropType.func,
  fetchMenu: PropType.func,
  menu: PropType.arrayOf(menuItemPropType).isRequired,
};

AdminMenuItemList.defaultProps = {
  onSelect: () => {},
  onDelete: null,
  fetchMenu: () => {},
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { onDelete: deleteMenuItem, fetchMenu })(AdminMenuItemList);
