import React from 'react';
import { create, act } from 'react-test-renderer';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent, findByText } from '@testing-library/react';
import { Button } from '@material-ui/core';
import SettingPage from './SettingPage';
import SettingPageInput from './SettingPageInput/SettingPageInput';


describe('Setting Page', () => {
  let component;
  let root;

  let onSubmitResult;

  const settingPage = (
    <SettingPage
      onSubmit={(r) => { onSubmitResult = r; return 'Good'; }}
      submitText="Test Submit Text"
      title="Test Title"
    >
      <SettingPageInput name="testName" label="testLabel" />
      <SettingPageInput name="testName2" label="testLabel2" value="testValue" />
    </SettingPage>
  );

  beforeEach(() => {
    component = create(settingPage);
    ({ root } = component);
    onSubmitResult = null;
  });

  afterEach(() => {
    component = null;
    root = null;
    onSubmitResult = null;
  });

  it('Displays title', () => {
    const { findByText } = render(settingPage);
    findByText('Test Title');
  });

  it('Displays submit text', () => {
    const submitButton = root.findByType(Button);
    expect(submitButton.props.children).toBe('Test Submit Text');
  });

  it('onSubmit sends correct object', () => {
    const submitButton = root.findByType(Button);
    act(() => {
      submitButton.props.onClick();
    });
    expect(JSON.stringify(onSubmitResult)).toBe(JSON.stringify({ testName: '', testName2: 'testValue' }));
  });

  it('onSubmit updates message', () => {
    const submitButton = root.findByType(Button);
    const message = root.find(c => c.props.id === 'message');
    act(() => {
      submitButton.props.onClick();
    });
    expect(message.props.children).toBe('Good');
  });
  it('Input changes value', () => {
    const { getByLabelText } = render(settingPage);
    const input = getByLabelText('testLabel');
    fireEvent.change(input, { target: { value: 'testValue' } });
    expect(input.value).toBe('testValue');
    cleanup();
  });

  it('Sets default value for input', () => {
    const { getByLabelText } = render(settingPage);
    const input = getByLabelText('testLabel2');
    expect(input.value).toBe('testValue');
  });
});
