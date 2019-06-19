import React from 'react';
import { create, act } from 'react-test-renderer';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
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
    const title = root.find(c => c.props.id === 'title');
    expect(title.props.children).toBe('Test Title');
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
    expect(JSON.stringify(onSubmitResult)).toBe(JSON.stringify({ testName: '' }));
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
});
