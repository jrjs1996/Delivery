import React from 'react';
import { create } from 'react-test-renderer';
import SettingPage from './SettingPage';
import SettingPageInput from './SettingPageInput/SettingPageInput';

describe('Setting Page', () => {
  let component;
  let root;

  let onSubmitResult;

  beforeEach(() => {
    component = create(
      <SettingPage
        onSubmit={(r) => {onSubmitResult = r;}}
        submitText="Test Submit Text"
        title="Test Title"
      >
        <SettingPageInput name="testName" />
      </SettingPage>,
    );
    const { root: componentRoot } = component;
    root = componentRoot;
    onSubmitResult = null;
  });
  it('Displays title', () => {
    const title = root.find(c => c.props.id === 'title');
    expect(title.props.children).toBe('Test Title');
  });
});
