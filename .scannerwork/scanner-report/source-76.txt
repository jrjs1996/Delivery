import React, { useState } from 'react';
import PropType from 'prop-types';


import {
  Grid,
  TextField,
  Card,
  Button,
} from '@material-ui/core';

export default function AddMenuItem({
  onSubmit,
  initTitle,
  initPrice,
  initDescription,
  initMenuNumber,
}) {
  const [title, setTitle] = useState(initTitle);
  const [price, setPrice] = useState(initPrice);
  const [description, setDescription] = useState(initDescription);
  const [menuNumber, setMenuNumber] = useState(initMenuNumber);
  return (
    <Card style={{
      marginLeft: '20%',
      marginRight: '20%',
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingBottom: '1%',
    }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField placeholder="Title" fullWidth value={title} onChange={e => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="number" placeholder="Price" fullWidth value={price} onChange={e => setPrice(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="number" placeholder="Menu Number (Optional)" fullWidth value={menuNumber} onChange={e => setMenuNumber(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder="Description" multiline rows={5} fullWidth value={description} onChange={e => setDescription(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onSubmit({
              title: title.trim(),
              price,
              menuNumber,
              description:
              description.trim(),
            })}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

AddMenuItem.propTypes = {
  onSubmit: PropType.func.isRequired,
  initTitle: PropType.string,
  initPrice: PropType.number,
  initDescription: PropType.string,
  initMenuNumber: PropType.number,
};

AddMenuItem.defaultProps = {
  initTitle: '',
  initPrice: '',
  initDescription: '',
  initMenuNumber: '',
};
