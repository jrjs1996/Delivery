import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';

const uploadFiles = (files, id) => {
  const fd = new FormData();
  fd.append('id', id);
  files.forEach(file => fd.append('image', file));

  axios.post('http://localhost:9000/menuitems/image/',
    fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(res => {
      console.log(res);
    });
};

export default function ImageUpload({ id }) {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <DropzoneArea onChange={setFiles} dropzoneText="Change item image" />
      <button type="button" onClick={() => uploadFiles(files, id)}>Upload</button>
    </div>
  );
}
