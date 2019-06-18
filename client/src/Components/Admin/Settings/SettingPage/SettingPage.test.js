import React from 'react';
import { create, act } from 'react-test-renderer';
import SettingPage from './SettingPage';
import SettingPageInput from './SettingPageInput/SettingPageInput';
import { Button } from '@material-ui/core';

describe('Setting Page', () => {
  let component;
  let root;

  let onSubmitResult;

  beforeEach(() => {
    component = create(
      <SettingPage
        onSubmit={(r) => { onSubmitResult = r; return 'Good'; }}
        submitText="Test Submit Text"
        title="Test Title"
      >
        <SettingPageInput name="testName" />
      </SettingPage>,
    );
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
});
