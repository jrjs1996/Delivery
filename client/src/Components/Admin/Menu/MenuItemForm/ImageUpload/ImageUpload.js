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
  id: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
};
