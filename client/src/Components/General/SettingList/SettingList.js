import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Card, Grid, Typography, Button,
} from '@material-ui/core';
import SettingListItem from './SettingListItem/SettingListItem';

export default function SettingList({
  items, itemString, onAdd, onClick, title,
}) {
  return (
    <Card style={{ paddingTop: '1%', paddingBottom: '2%' }}>
      <Typography variant="h4" id="title" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={1}>
        {Object.entries(items).map(([, item]) => {
          const text = itemString(item);
          return (
            <SettingListItem item={item} onClick={() => onClick(item)} text={text} key={text} />
          );
        })}
      </Grid>
      {onAdd ? (
        <Button
          color="secondary"
          id="addButton"
          onClick={onAdd}
          style={{ marginTop: 8 }}
          variant="contained"
        >
          <AddIcon />
        </Button>
      ) : null}
    </Card>
  );
}

SettingList.propTypes = {
  /** Items to populate the list.  */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Function that takes an item and returns a string
   * to represent the function in the list. */
  itemString: PropTypes.func.isRequired,
  /** Function to be called when an item is clicked on.
   * Function will receive the item. */
  onClick: PropTypes.func.isRequired,
  /** Title to appear at top of list. */
  title: PropTypes.string.isRequired,
};
