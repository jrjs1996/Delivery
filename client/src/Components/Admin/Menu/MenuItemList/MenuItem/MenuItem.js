import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import PropType from 'prop-types';

export default function MenuItem({
  title,
  description,
  number,
  price,
  onSelect,
  onDelete,
  _id,
}) {
  return (
    <Paper
      onClick={() => onSelect({
        title,
        description,
        menuNumber: number,
        price,
        _id,
      })}
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                {number}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                $
                {price}
              </Typography>
            </Paper>
          </Grid>
          { onDelete ? (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(number);
                }}
              >
              Delete
              </Button>
            </Grid>
          ) : null }
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

MenuItem.propTypes = {
  /** Description of the menu item. */
  description: PropType.string.isRequired,
  /** Number on the menu */
  number: PropType.string.isRequired,
  /** Price of the item */
  price: PropType.string.isRequired,
  /** Name of the menu item */
  title: PropType.string.isRequired,
  /** Function to be called when the menu item
   * is clicked on. (Anywhere but the delete button) */
  onSelect: PropType.func,
  /** Function to be called when the delete button
   * is clicked. */
  onDelete: PropType.func,
};

MenuItem.defaultProps = {
  onSelect: null,
  onDelete: null,
};
