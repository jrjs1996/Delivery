import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import AuthButton from './AuthButton';

let getByText;

let logoutAction = jest.fn();
let loginAction = jest.fn();

describe('AuthButton when logged in', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']}>
        <Route
          path="/"
          render={props => (
            <AuthButton loginAction={loginAction} logoutAction={logoutAction} loggedIn {...props} />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    loginAction = jest.fn();
    logoutAction = jest.fn();
  });

  it('Calls action when clicked on', () => {
    fireEvent.click(getByText('Logout'));
    expect(logoutAction).toBeCalled();
  });
});

describe('AuthButton when not logged in', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']}>
        <Route
          path="/"
          render={props => (
            <AuthButton loginAction={loginAction} logoutAction={logoutAction} {...props} />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    loginAction = jest.fn();
    logoutAction = jest.fn();
  });

  it('Calls action when clicked on', () => {
    fireEvent.click(getByText('LogIn'));
    expect(loginAction).toBeCalled();
  });
});
