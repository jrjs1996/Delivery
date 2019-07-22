import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Item from './Item';


describe('Order/Item', () => {
  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <Item
        title="testTitle"
        menuNumber={1}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays title', () => {
    getByText('testTitle');
  });

  it('Displays menu number', () => {
    getByText('1');
  });
});
