import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import SettingPageCheckBox from './SettingPageCheckBox';


describe('SettingPageCheckBox', () => {
  let getByText;
  let getByLabelText;

  let onChange = jest.fn();

  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <SettingPageCheckBox
        name="testName"
        label="Test Label"
        onChange={onChange}
        value={false}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onChange = jest.fn();
  });

  it('Displays the label', () => {
    getByText('Test Label');
  });

  it('Has correct initial value', () => {
    expect(getByLabelText('Test Label').checked).toBe(false);
  });

  it('Calls onChange with correct values', () => {
    fireEvent.click(getByLabelText('Test Label'));
    expect(onChange).toBeCalledWith({ target: { name: 'testName', value: true } });
  });
});
