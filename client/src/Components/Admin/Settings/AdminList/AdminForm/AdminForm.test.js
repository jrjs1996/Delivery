import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import AdminForm from './AdminForm';

let getByText;
let getByLabelText;

let onSubmit = jest.fn();

describe('AdminForm with user', () => {


  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <AdminForm
        id="TestId"
        username="Testusername"
        onSubmit={onSubmit}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onSubmit = jest.fn();
  });

  it('Submits correct data', () => {
    fireEvent.change(getByLabelText(new RegExp('Username*')), { target: { value: 'newUsername' } });
    fireEvent.change(getByLabelText(new RegExp('Password*')), { target: { value: 'newPassword' } });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith({ _id: 'TestId', username: 'newUsername', password: 'newPassword' });
  });
});

describe('AdminForm without user', () => {
  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <AdminForm onSubmit={onSubmit} />,
    ));
  });

  afterEach(() => {
    cleanup();
    onSubmit = jest.fn();
  });

  it('Submits correct data', () => {
    fireEvent.change(getByLabelText(new RegExp('Username*')), {
      target: { value: 'newUsername' },
    });
    fireEvent.change(getByLabelText(new RegExp('Password*')), {
      target: { value: 'newPassword' },
    });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith({
      username: 'newUsername',
      password: 'newPassword',
    });
  });
});
