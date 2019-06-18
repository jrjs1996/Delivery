import React from 'react';
import PropType from 'prop-types';
import { Button, Grid } from '@material-ui/core';

export default function SettingListItem({ onClick, text }) {
  return (
    <Grid item xs={12}>
      <Button variant="contained" onClick={onClick}>{ text }</Button>
    </Grid>
  );
}

SettingListItem.propTypes = {
  /** Function to be called when the item is
   * clicked on. Given by the SettingList this
   * item belongs to. */
  onClick: PropType.func.isRequired,
  /**
   * Text representing the object this item represents.
   */
  text: PropType.string.isRequired,
};
