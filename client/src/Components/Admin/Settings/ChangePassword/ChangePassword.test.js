import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { adminsMock } from '../../../../tests/mocks';
import { ChangePasswordComponent } from './ChangePassword';

describe('ChangePassword.test', () => {
  let getByText;
  let getByLabelText;

  let changeCurrentAdminPassword = jest.fn();

  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <ChangePasswordComponent
        changeCurrentAdminPassword={changeCurrentAdminPassword}
        currentAdmin={adminsMock[0]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    changeCurrentAdminPassword = jest.fn();
  });

  it('Calls changeCurrentAdminPassword with correct values', () => {
    fireEvent.change(getByLabelText(new RegExp('^New Password*')), {
      target: { value: 'newPassword' },
    });
    fireEvent.change(getByLabelText(new RegExp('^Confirm New Password*')), {
      target: { value: 'newPassword' },
    });
    fireEvent.click(getByText('Submit'));
    expect(changeCurrentAdminPassword).toBeCalledWith(adminsMock[0]._id, 'newPassword');
  });

  it("Doesn't call changeCurrentAdminPassword if passwords don't match", () => {
    fireEvent.change(getByLabelText(new RegExp('^New Password*')), {
      target: { value: 'newPassword' },
    });
    fireEvent.change(getByLabelText(new RegExp('^Confirm New Password*')), {
      target: { value: 'newASdfasf' },
    });
    fireEvent.click(getByText('Submit'));
    expect(changeCurrentAdminPassword).not.toHaveBeenCalled();
  });
});
