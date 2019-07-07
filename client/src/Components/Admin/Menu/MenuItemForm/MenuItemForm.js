/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@material-ui/core';
import SettingPage from '../../Settings/SettingPage/SettingPage';
import SettingPageInput from '../../Settings/SettingPage/SettingPageInput/SettingPageInput';
import ImageUpload from './ImageUpload/ImageUpload';


export default function MenuItemForm({
  description,
  id,
  image,
  menuNumber,
  onSubmit,
  price,
  title,
  uploadImage,
}) {
  return (
    <div className="MenuItemForm">
      <SettingPage
        title="Item"
        onSubmit={(data) => {
          if (id) {
            data._id = id;
          }
          return onSubmit(data);
        }}
      >
        <SettingPageInput required fullWidth name="title" label="Title" value={title} />
        <SettingPageInput required fullWidth name="price" label="Price" value={price} />
        <SettingPageInput required fullWidth name="menuNumber" label="Number" value={menuNumber} />
        <SettingPageInput required fullWidth name="description" multiline label="Description" value={description} />
      </SettingPage>
      <Paper>
        { image ? (
          <div>
            <img src={`/uploads/${image}`} alt="Item" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            <br />
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 5, marginBottom: 5 }}
              onClick={() => onSubmit({ menuNumber, image: null })}
            >
              Delete Image
            </Button>
          </div>
        ) : id ? <ImageUpload id={id} uploadImage={uploadImage} /> : null }
      </Paper>
    </div>
  );
}

MenuItemForm.propTypes = {
  description: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.bool,
  menuNumber: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  price: PropTypes.number,
  title: PropTypes.string,
  uploadImage: PropTypes.func,
};

MenuItemForm.defaultProps = {
  description: '',
  id: null,
  image: false,
  menuNumber: null,
  price: null,
  title: null,
  uploadImage: null,
};
