import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function SettingPageInput({
  fullWidth,
  label,
  name,
  onChange,
  required,
  type,
  value,
}) {
  return (
    <div>
      <Grid item xs={6}>
        <TextField
          fullWidth={fullWidth}
          id={name}
          label={label}
          name={name}
          onChange={onChange}
          required={required}
          type={type}
          value={value}
        />
      </Grid>
    </div>
  );
}

SettingPageInput.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.func.isRequired,
};

SettingPageInput.defaultProps = {
  fullWidth: false,
  label: '',
  required: false,
  type: 'text',
};
