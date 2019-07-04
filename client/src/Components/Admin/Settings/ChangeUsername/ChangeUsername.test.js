import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { ChangeUsernameComponent } from './ChangeUsername'
import { adminsMock } from '../../../../tests/mocks';


describe('ChangeUsername', () => {
  let getByText;
  let getByLabelText;
  let changeCurrentAdminUsername = jest.fn();

  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <ChangeUsernameComponent
        changeCurrentAdminUsername={changeCurrentAdminUsername}
        currentAdmin={adminsMock[0]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    changeCurrentAdminUsername = jest.fn();
  });

  it('Calls changeCurrentAdminUsername with correct values', () => {
    fireEvent.change(getByLabelText(new RegExp('New Username*')), { target: { value: 'newUsername' } });
    fireEvent.click(getByText('Submit'));
    expect(changeCurrentAdminUsername).toBeCalledWith(adminsMock[0]._id, 'newUsername');
  });
});
