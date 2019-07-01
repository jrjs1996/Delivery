import React from 'react';
import PropTypes from 'prop-types';
import SettingPage from '../../Settings/SettingPage/SettingPage';
import SettingPageInput from '../../Settings/SettingPage/SettingPageInput/SettingPageInput';
import {DropzoneArea} from 'material-ui-dropzone';
import ImageUpload from './ImageUpload/ImageUpload';
import { Button } from '@material-ui/core';

export default function MenuItemForm({
  description,
  id,
  menuNumber,
  onSubmit,
  price,
  title,
  image,
}) {
  return (
    <div>
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
      {console.log(image)}
      { image ? (
        <div>
          <img src={`http://localhost:9000/uploads/${id}`} alt="Item" />
          <br />
          <Button
            color="secondary"
            variant="contained"
            onClick={() => onSubmit({ menuNumber, image: false })}
          >
            Delete
          </Button>
        </div>
      ) : id ? <ImageUpload id={id} /> : null }
    </div>
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
