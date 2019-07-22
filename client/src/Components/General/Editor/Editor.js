import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.css';

export default function EditorComponent({ onChange }) {
  return (
    <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onChange={onChange}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'image', 'history'],
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          previewImage: true,
          uploadCallback: async (file) => {
            const fd = new FormData();
            const id = uuid();
            fd.append('id', id);
            fd.append('image', file);
            await axios.post('/api/admins/image/', fd, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            return { data: { link: `/uploads/${id}` } };
          },
        },
      }}
    />
  );
}

EditorComponent.propTypes = {
  /** Function when change is made to the content being edited. */
  onChange: PropTypes.func.isRequired,
};
