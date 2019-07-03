import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export default function SettingPageCheckBox({
  label,
  name,
  onChange,
  value,
}) {
  return (
    <FormControlLabel
      control={<Checkbox color="secondary" name={name} />}
      label={label}
      checked={value}
      onChange={(e, b) => onChange({ target: { name, value: b } })}
    />
  );
}

SettingPageCheckBox.propTypes = {
  /** Label for the check box */
  label: PropTypes.string.isRequired,
  /** Name used for check box value when page is submitted */
  name: PropTypes.string.isRequired,
  /** Used by Setting Page, don't set manually */
  onChange: PropTypes.func,
  /** Initial value of the check box. */
  value: PropTypes.bool.isRequired,
};

SettingPageCheckBox.defaultProps = {
  onChange: null,
};
