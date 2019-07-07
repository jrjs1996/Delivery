import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import '../../AdminMenu/AdminMenu.css';

export default function ImageUpload({ id, uploadImage }) {
  return (
    <div>
      <DropzoneArea
        dropzoneText="Upload item image"
        filesLimit={1}
        onChange={files => uploadImage(id, files[0])}
        showAlerts={false}
        showPreviewsInDropzone={false}
      />
    </div>
  );
}

ImageUpload.propTypes = {
  /** Id of the menu item to upload the image for. */
  id: PropTypes.string.isRequired,
  /** Function to upload the file. Given the id of the
   * menu item and the file to upload. */
  uploadImage: PropTypes.func.isRequired,
};
