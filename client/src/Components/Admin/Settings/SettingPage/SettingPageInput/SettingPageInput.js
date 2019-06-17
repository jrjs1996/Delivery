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
  /** If true, the input will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** Label content to be displayed on the input. */
  label: PropTypes.bool,
  /** Name used to reference the inputs value in onSubmit of the parent
   * SettingPage component. All SettingPageInput children of a
   * SettingPage must have a unique name.
   */
  name: PropTypes.string.isRequired,
  /** Receives this prop from parent SettingPage component. Don't set manually. */
  onChange: PropTypes.func.isRequired,
  /** If true the label is displayed as required. */
  required: PropTypes.bool,
  /** The type of the input element. */
  type: PropTypes.string,
  /** Received this prop from parent SettingPage component. Don't set manually. */
  value: PropTypes.func.isRequired,
};

SettingPageInput.defaultProps = {
  fullWidth: false,
  label: '',
  required: false,
  type: 'text',
};
