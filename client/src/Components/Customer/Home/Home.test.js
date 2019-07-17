import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { HomeComponent } from './Home';
import { menuItemsMock } from '../../../tests/mocks';


describe('Home.test', () => {
  let getByText;

  let fetchAction = jest.fn();

  beforeEach(() => {
    ({ getByText } = render(
      <HomeComponent
        fetchAction={fetchAction}
        menuItems={menuItemsMock}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Calls fetch action on render', () => {
    expect(fetchAction).toBeCalled();
  });

  it('Renders menu items', () => {
    menuItemsMock.forEach((i) => {
      getByText(i.title);
    });
  });
});
