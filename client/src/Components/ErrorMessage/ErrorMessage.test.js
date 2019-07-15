import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage.test', () => {
  let getByText;
  let container;

  beforeEach(() => {
    ({ getByText, container } = render(<ErrorMessage message="TestMessage" errorCount={1} />));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays error message', () => {
    getByText('TestMessage');
  });
  it('Has error message button.', () => {
    fireEvent.click(container.querySelector('#closeErrorMessageButton'));
  });
});
