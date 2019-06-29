import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addMenuItem, updateMenuItem } from '../../../../actions/menuActions';
import SettingPage from '../../Settings/SettingPage/SettingPage';
import SettingPageInput from '../../Settings/SettingPage/SettingPageInput/SettingPageInput';
import { menuItemFormPropType } from '../../../../propTypes';

const onSubmit = (submitData, update, addAction, updateAction) => {
  if (update) {
    updateAction(submitData);
    return 'Item updated!';
  }
  addAction(submitData);
  return 'Item added';
};

export function AdminMenuItemFormComponent({ menuItem, addMenuItem: addAction, updateMenuItem: updateAction }) {
  return (
    <SettingPage
      title="Order"
      onSubmit={submitData => onSubmit(submitData, menuItem._id, addAction, updateAction)}
      style={{ paddingLeft: '20%', paddingRight: '20%' }}
    >
      <SettingPageInput required fullWidth name="title" label="Title" value={menuItem.title} />
      <SettingPageInput required fullWidth name="price" label="Price" value={menuItem.price} />
      <SettingPageInput required fullWidth name="menuNumber" label="Number" value={menuItem.menuNumber} />
      <SettingPageInput required fullWidth name="description" multiline label="Description" value={menuItem.description} />
    </SettingPage>
  );
}

AdminMenuItemFormComponent.propTypes = {
  /** Menu item to initialize the form with. If a
   * menu item is provided the form will call
   * updateMenuItem. If none is given it will
   * call addMenuItem.
   */
  menuItem: menuItemFormPropType,
  /** Function to call when adding a new menu item. */
  addMenuItem: PropTypes.func.isRequired,
  /** Function called on submit when menuItem is given. */
  updateMenuItem: PropTypes.func.isRequired,
};

AdminMenuItemFormComponent.defaultProps = {
  menuItem: {
    title: '',
    price: '',
    menuNumber: '',
    description: '',
  },
};

export default connect(null, { addMenuItem, updateMenuItem })(AdminMenuItemFormComponent);
