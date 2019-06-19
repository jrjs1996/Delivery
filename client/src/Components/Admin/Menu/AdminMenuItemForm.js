import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addMenuItem, updateMenuItem } from '../../../actions/menuActions';
import SettingPage from '../Settings/SettingPage/SettingPage';
import SettingPageInput from '../Settings/SettingPage/SettingPageInput/SettingPageInput';
import { menuItemPropType } from '../../../propTypes';

const onSubmit = (submitData, update, addAction, updateAction) => {
  if (update) {
    updateAction(submitData);
    return 'Item updated!';
  }
  addAction(submitData);
  return 'Item added';
};

function AdminMenuItemForm({ menuItem, addMenuItem: addAction, updateMenuItem: updateAction }) {
  return (
    <SettingPage
      title="Order"
      onSubmit={submitData => onSubmit(submitData, menuItem._id, addAction, updateAction)}
    >
      <SettingPageInput required fullWidth name="title" label="Title" value={menuItem.title} />
      <SettingPageInput required fullWidth name="price" label="Price" value={menuItem.price} />
      <SettingPageInput required fullWidth name="menuNumber" label="Number" value={menuItem.menuNumber} />
      <SettingPageInput required fullWidth name="description" label="Description" value={menuItem.description} />
    </SettingPage>
  );
}

AdminMenuItemForm.propTypes = {
  menuItem: menuItemPropType,
  addMenuItem: PropTypes.func.isRequired,
  updateMenuItem: PropTypes.func.isRequired,
};

AdminMenuItemForm.defaultProps = {
  menuItem: null,
};

export default connect(null, { addMenuItem, updateMenuItem })(AdminMenuItemForm);
