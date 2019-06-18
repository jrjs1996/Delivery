import React from 'react';
import { create } from 'react-test-renderer';
import { Button } from '@material-ui/core';
import SettingListItem from './SettingListItem';


describe('Setting list item', () => {
  let component;
  let root;
  let button;

  let onClickResult = false;

  beforeEach(() => {
    component = create(
      <SettingListItem onClick={() => { onClickResult = true; }} text="Test Text" />,
    );
    ({ root } = component);
    button = root.findByType(Button);
  });

  afterEach(() => {
    component = null;
    root = null;
    button = null;
    onClickResult = false;
  });

  it('Has correct button text', () => {
    expect(button.props.children).toBe('Test Text');
  });

  it('OnClick works', () => {
    button.props.onClick();
    expect(onClickResult).toBe(true);
  });
});
