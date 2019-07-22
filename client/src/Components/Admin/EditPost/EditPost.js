import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import Editor from '../../General/Editor/Editor';

export default function EditPost() {
  const [post, setPost] = useState({});

  return (
    <div>
      <TextField
        label="Title"
      />
      <Editor onChange={setPost} />
      <Button color="primary" variant="contained" onClick={() => console.log(draftToHtml(post))}>Submit</Button>
    </div>
  );
}
