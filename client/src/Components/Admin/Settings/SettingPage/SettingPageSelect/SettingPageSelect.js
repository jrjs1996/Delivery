import PropType from 'prop-types';
import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import shortId from 'shortid';

const currentOptions = (options, state, getOptions) => {
  if (getOptions) {
    return getOptions(state);
  }
  return options;
};

export default function SettingPageSelect({
  getOptions,
  name,
  onChange,
  options,
  state,
  value,
}) {
  const optionsToRender = currentOptions(options, state, getOptions);

  return (
    <Select value={value} name={name} onChange={onChange}>
      {optionsToRender.map(o => <MenuItem key={shortId.generate()} value={o[0]}>{o[1]}</MenuItem>)}
    </Select>
  );
}

SettingPageSelect.propTypes = {
  /** Function to get options. The function is passed the
   * current state of the form with the values of all the form inputs.
   * This function should return an array of shape [[value, name]...]
   * for the options. If this prop is given the options prop will be ignored. */
  getOptions: PropType.func,
  /** Name that will be used for the value when submitting. */
  name: PropType.string.isRequired,
  /** Provided by Setting page, don't set manually. */
  onChange: PropType.func,
  /** Array of shape [[value, name]...] that will be used to
   * populate the select list. This property will be ignored if
   * getOptions is provided. */
  options: PropType.arrayOf(PropType.array),
  /** The state of the SettingPage. Provided by setting page,
   * don't set manually */
  state: PropType.object,
  /** Initial value */
  value: PropType.number.isRequired,
};

SettingPageSelect.defaultProps = {
  onChange: null,
  options: null,
  getOptions: null,
  state: null,
};
