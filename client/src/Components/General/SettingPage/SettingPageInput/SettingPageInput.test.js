/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { create } from 'react-test-renderer';

import TextField from '@material-ui/core/TextField';

import SettingPageInput from './SettingPageInput';

describe('Setting Page Input', () => {
  let component;
  let root;
  let textField;

  let onChangeResult;

  beforeEach(() => {
    component = create(
      <SettingPageInput
        fullWidth
        label="Test Label"
        name="testName"
        required
        type="text"
        onChange={(e) => { onChangeResult = e.target.value; }}
        value="1"
      />,
    );
    ({ root } = component);
    textField = root.findByType(TextField);
    onChangeResult = null;
  });

  afterEach(() => {
    component = null;
    root = null;
    textField = null;
    onChangeResult = null;
  });

  it('Is fulll width', () => {
    expect(textField.props.fullWidth).toBe(true);
  });

  it('Shows label', () => {
    expect(textField.props.label).toBe('Test Label');
  });

  it('Has correct name', () => {
    expect(textField.props.name).toBe('testName');
  });

  it('Is required', () => {
    expect(textField.props.required).toBe(true);
  });

  it('Has correct type', () => {
    expect(textField.props.type).toBe('text');
  });

  it('OnChange works', () => {
    textField.props.onChange({ target: { value: 'test' } });
    expect(onChangeResult).toBe('test');
  });

  it('Has correct value', () => {
    expect(textField.props.value).toBe('1');
  });
});
