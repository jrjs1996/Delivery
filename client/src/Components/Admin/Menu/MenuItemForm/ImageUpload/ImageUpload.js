import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';


export default function ImageUpload({ id, uploadImage }) {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <DropzoneArea onChange={setFiles} dropzoneText="Change item image" />
      <button type="button" onClick={() => uploadImage(id, files[0])}>Upload</button>
    </div>
  );
}
