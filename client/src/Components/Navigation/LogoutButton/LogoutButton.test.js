import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import LogoutButton from './LogoutButton';


describe('LogoutButton', () => {
  let getByText;

  let action = jest.fn();

  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']}>
        <Route
          path="/"
          render={props => (
            <LogoutButton
              action={action}
              {...props}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    action = jest.fn();
  });

  it('Calls action when clicked on', () => {
    fireEvent.click(getByText('Logout'));
    expect(action).toBeCalled();
  });
});
