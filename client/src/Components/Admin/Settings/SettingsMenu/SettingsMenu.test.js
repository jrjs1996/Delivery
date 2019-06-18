import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';

import SettingsMenu from './SettingsMenu';
import SettingsMenuItem from './SettingsMenuItem/SettingsMenuItem';

describe('Settings Menu', () => {
  let component;
  let root;

  let onClickResult;

  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <SettingsMenu
        title="Test Title"
        onClick={(i) => { onClickResult = i; }}
      >
        <SettingsMenuItem text="First" />
        <SettingsMenuItem text="Second" />
        <SettingsMenuItem text="Third" />
      </SettingsMenu>,
    ));
  });

  afterEach(() => {
    onClickResult = null;
    cleanup();
  });

  it('Has title', () => {
    getByText('Test Title');
  });

  it('Displays Menu Items', () => {
    getByText('First');
    getByText('Second');
    getByText('Third');
  });

  it('On click sends correct values', () => {
    fireEvent.click(getByText('First'));
    expect(onClickResult).toBe(0);

    fireEvent.click(getByText('Second'));
    expect(onClickResult).toBe(1);

    fireEvent.click(getByText('Third'));
    expect(onClickResult).toBe(2);
  });
});
