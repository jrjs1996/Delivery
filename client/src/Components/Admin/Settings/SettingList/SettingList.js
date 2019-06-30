import React from 'react';
import PropType from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import SettingListItem from './SettingListItem/SettingListItem';

export default function SettingList({
  items,
  itemString,
  onAdd,
  onClick,
  title,
}) {
  return (
    <Card style={{ paddingTop: '1%', paddingBottom: '2%' }}>
      <Typography variant="h4" id="title" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={1}>
        { items.map((item) => {
          const text = itemString(item);
          return (
            <SettingListItem
              item={item}
              onClick={() => onClick(item)}
              text={text}
              key={text}
            />
          );
        })}
      </Grid>
      { onAdd ? (
        <Button onClick={onAdd} variant="contained" color="secondary"><AddIcon /></Button>
      ) : null}
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
