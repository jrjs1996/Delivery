import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';


export default function ImageUpload({ id, uploadImage }) {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <DropzoneArea onChange={setFiles} dropzoneText="Upload item image" />
      <Button variant="contained" onClick={() => uploadImage(id, files[0])} color="primary">Upload</Button>
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
