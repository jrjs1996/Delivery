import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import MenuItem from './MenuItem';


describe('MenuItem.test', () => {
  let getByText;

  let onSelectResult = false;
  let onDeleteResult = false;

  beforeEach(() => {
    ({ getByText } = render(
      <MenuItem
        title="TestTitle"
        description="TestDescription"
        number="1234"
        price="4321"
        onSelect={() => { onSelectResult = true; }}
        onDelete={() => { onDeleteResult = true; }}
        _id="2"
      />,
    ));
  });

  afterEach(() => {
    onSelectResult = false;
    onDeleteResult = false;
    cleanup();
  });

  it('Displays Title', () => {
    getByText('TestTitle');
  });

  it('Displays Description', () => {
    getByText('TestDescription');
  });

  it('Displays Number', () => {
    getByText('1234');
  });

  it('Displays Price', () => {
    getByText('$4321');
  });

  it('OnSelect Works', () => {
    fireEvent.click(getByText('TestTitle'));
    expect(onSelectResult).toBe(true);
    expect(onDeleteResult).toBe(false);
  });

  it('OnDelete Works', () => {
    fireEvent.click(getByText('Delete'));
    expect(onSelectResult).toBe(false);
    expect(onDeleteResult).toBe(true);
  });
});
