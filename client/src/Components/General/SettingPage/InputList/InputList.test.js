import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import InputList from './InputList';


describe('InputList.test', () => {
  let getByText;
  beforeEach(() => {
    ({ getByText } = render(
      <InputList
        name="test"
        value={[{ key: 'test', value: 'testValue' }]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Populates initial value', () => {
    getByText('test 0');
  });
});
