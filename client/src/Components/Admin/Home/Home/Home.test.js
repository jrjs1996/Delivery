import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { HomeComponent } from './Home';
import { ordersMock } from '../../../../tests/mocks';


describe('Home.test', () => {
  let getByText;
  let getAllByText;
  let fetchAction = jest.fn();
  let updateAction = jest.fn();

  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <HomeComponent
        fetchAction={fetchAction}
        orders={ordersMock}
        updateAction={updateAction}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    fetchAction = jest.fn();
    updateAction = jest.fn();
  });

  it('Displays orders', () => {
    getByText(ordersMock[0].customerName);
    getByText(ordersMock[1].customerName);
  });

  it('Calls fetch action', () => {
    expect(fetchAction).toBeCalled();
  });

  it('Calls updateAction when an submit is clicked', () => {
    fireEvent.click(getAllByText('Next')[0]);
    expect(updateAction).toBeCalled();
  });
});
