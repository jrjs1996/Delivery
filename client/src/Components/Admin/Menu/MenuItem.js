import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropType from 'prop-types';

export default function MenuItem({
  title,
  description,
  number,
  price,
  onSelect,
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
};

MenuItem.defaultProps = {
  onSelect: null,
};
