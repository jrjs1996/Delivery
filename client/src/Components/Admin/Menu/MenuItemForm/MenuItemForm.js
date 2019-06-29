import React from 'react';
import PropTypes from 'prop-types';
import SettingPage from '../../Settings/SettingPage/SettingPage';
import SettingPageInput from '../../Settings/SettingPage/SettingPageInput/SettingPageInput';

export default function MenuItemForm({
  description,
  id,
  menuNumber,
  onSubmit,
  price,
  title,
}) {
  return (
    <SettingPage
      title="Order"
      onSubmit={(data) => {
        if (id) {
          data._id = id;
        }
        onSubmit(data);
      }}
    >
      <SettingPageInput required fullWidth name="title" label="Title" value={title} />
      <SettingPageInput required fullWidth name="price" label="Price" value={price} />
      <SettingPageInput required fullWidth name="menuNumber" label="Number" value={menuNumber} />
      <SettingPageInput required fullWidth name="description" multiline label="Description" value={description} />
    </SettingPage>
  );
}

MenuItemForm.propTypes = {
  description: PropTypes.string,
  id: PropTypes.string,
  menuNumber: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  price: PropTypes.number,
  title: PropTypes.string,
};

MenuItemForm.defaultProps = {
  description: '',
  id: null,
  menuNumber: null,
  price: null,
  title: null,
};
