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
      style={{
        marginTop: '2%',
        marginLeft: '10%',
        marginRight: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
      }}
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
              <Button variant="contained" color="secondary" onClick={(e) => {
                onDelete(number);
                e.stopPropagation();
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
  description: PropType.string.isRequired,
  number: PropType.string.isRequired,
  price: PropType.string.isRequired,
  title: PropType.string.isRequired,
  onSelect: PropType.func,
  onDelete: PropType.func.isRequired,
};

MenuItem.defaultProps = {
  onSelect: null,
};
