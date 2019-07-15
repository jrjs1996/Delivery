import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function SettingPageInput({
  fullWidth,
  label,
  multiline,
  name,
  onChange,
  required,
  type,
  value,
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      id={name}
      label={label}
      multiline={multiline}
      name={name}
      onChange={onChange}
      required={required}
      type={type}
      value={value}
    />
  );
}

SettingPageInput.propTypes = {
  /** If true, the input will take up the full width of its container. */
  fullWidth: PropTypes.bool,
  /** Label content to be displayed on the input. */
  label: PropTypes.string,
  /** If true input will appear on multiple lines if long enough */
  multiline: PropTypes.bool,
  /** Name used to reference the inputs value in onSubmit of the parent
   * SettingPage component. All SettingPageInput children of a
   * SettingPage must have a unique name.
   */
  name: PropTypes.string.isRequired,
  /** Receives this prop from parent SettingPage component. Don't set manually. */
  onChange: PropTypes.func,
  /** If true the label is displayed as required. */
  required: PropTypes.bool,
  /** The type of the input element. */
  type: PropTypes.string,
  /** Received this prop from parent SettingPage component. Don't set manually. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SettingPageInput.defaultProps = {
  fullWidth: false,
  label: '',
  multiline: false,
  required: false,
  type: 'text',
  onChange: undefined,
  value: undefined,
};
