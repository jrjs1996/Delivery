import React from 'react';
import PropType from 'prop-types';
import { Card, Grid, Typography } from '@material-ui/core';
import SettingListItem from './SettingListItem/SettingListItem';

export default function SettingList({
  title,
  items,
  onClick,
  itemString,
}) {
  return (
    <Card style={{ paddingTop: '1%', paddingBottom: '2%' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={1}>
        { items.map(item => (
          <SettingListItem
            item={item}
            onClick={() => onClick(item)}
            text={itemString(item)}
          />
        ))}
      </Grid>
    </Card>
  );
}

SettingList.propTypes = {
  /** Items to populate the list.  */
  items: PropType.arrayOf(PropType.object).isRequired,
  /** Function that takes an item and returns a string
   * to represent the function in the list. */
  itemString: PropType.func.isRequired,
  /** Function to be called when an item is clicked on.
   * Function will receive the item. */
  onClick: PropType.func.isRequired,
  /** Title to appear at top of list. */
  title: PropType.string.isRequired,
};
