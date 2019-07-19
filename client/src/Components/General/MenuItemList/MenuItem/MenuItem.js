import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// !! When modifying make sure to test with all modes
// Make sure to check sizes are being effected in the different modes.

export default function MenuItem({
  title,
  description,
  number,
  image,
  imageMode,
  price,
  onSelect,
  onDelete,
  _id,
}) {
  const [displayImage, setdisplayImage] = useState(false);

  const showImage = image && (imageMode === 'always' || (imageMode === 'onClick' && displayImage));
  return (
    <Paper
      className="MenuItem"
      onClick={() => {
        if (imageMode === 'onClick') {
          setdisplayImage(!displayImage);
        } else {
          onSelect({
            _id, description, image, menuNumber: number, price, title,
          });
        }
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2} sm={1}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {number}
            </Typography>
          </Paper>
        </Grid>
        <Grid item style={{ textAlign: 'left' }} xs={10} sm={9}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              $
              {price}
            </Typography>
          </Paper>
        </Grid>
        <Grid item style={{ textAlign: 'left' }} xs={imageMode === 'onClick' ? 10 : 12}>
          <Typography style={{ wordWrap: 'break-word', fontSize: 'large' }} gutterBottom>
            {description}
          </Typography>
        </Grid>
        { imageMode === 'onClick' ? (
          <Grid item xs={2}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              variant="contained"
              color="secondary"
            >
              Select
            </Button>
          </Grid>
        ) : null}
      </Grid>
      {showImage ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <img
              src={`/uploads/${image}`}
              alt="Menu Item"
              style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            />
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={1} justify="flex-end" style={{ paddingTop: 5, paddingRight: 0 }}>
        {onDelete ? (
          <Grid item xs={4} md={2}>
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
        ) : null}
      </Grid>
    </Paper>
  );
}

MenuItem.propTypes = {
  /** Description of the menu item. */
  description: PropTypes.string.isRequired,
  /** Image to display */
  image: PropTypes.string.isRequired,
  /** How to display the image */
  imageMode: PropTypes.string,
  /** Number on the menu */
  number: PropTypes.number.isRequired,
  /** Price of the item */
  price: PropTypes.number.isRequired,
  /** Name of the menu item */
  title: PropTypes.string.isRequired,
  /** Function to be called when the menu item
   * is clicked on. (Anywhere but the delete button) */
  onSelect: PropTypes.func,
  /** Function to be called when the delete button
   * is clicked. */
  onDelete: PropTypes.func,
};

MenuItem.defaultProps = {
  imageMode: 'off',
};

MenuItem.defaultProps = {
  onSelect: null,
  onDelete: null,
};
