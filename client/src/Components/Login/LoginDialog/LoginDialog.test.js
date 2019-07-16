import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import LoginDialog from './LoginDialog';

describe('LoginDialog.test', () => {
  let getByText;
  let getAllByText;
  let getByLabelText;

  let action = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    ({ getByText, getAllByText, getByLabelText } = render(
      <LoginDialog action={action} onClose={onClose} open />,
    ));
  });

  it('Has email field', () => {
    getByLabelText('Email');
  });

  it('Has password field', () => {
    getByLabelText('Password');
  });

  it('Has cancel button', () => {
    getByText('Cancel');
  });

  it('Has Login button ', () => {
    getAllByText('Login');
  });

  it('Calls action with username and password when login is clicked', () => {
    const email = 'TestEmail';
    const password = 'TestPassword';

    fireEvent.change(getByLabelText('Email'), { target: { value: email } });
    fireEvent.change(getByLabelText('Password'), { target: { value: password } });
    fireEvent.click(getAllByText('Login')[1]);
    expect(action).toBeCalledWith(email, password);
  });

  it('Calls onClose when cancel button is clicked', () => {
    fireEvent.click(getByText('Cancel'));
    expect(onClose).toBeCalled();
  });

  afterEach(() => {
    cleanup();
    action = jest.fn();
  });
});
