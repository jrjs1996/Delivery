import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { shallow, configure, mount } from 'enzyme';
import 'jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AdminComponent } from './Admin';
import {
  adminsMock, ordersMock, customersMock, menuItemsMock, storeMock,
} from '../../tests/mocks';
import Home from './Home/Home/Home';
import Customers from './Customers/Customers/Customers';
import AdminMenu from './Menu/AdminMenu/AdminMenu';
import CreateOrder from './CreateOrder/CreateOrder';
import Settings from './Settings/Settings';

configure({ adapter: new Adapter() });

const store = storeMock;

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

let getInfo = jest.fn();
let logoutAction = jest.fn();

const getPath = path => (
  <div>
    <Router initialEntries={[path]} initialIndex={0}>
      <Provider store={store}>
        <Route
          path="/"
          render={props => (
            <AdminComponent
              currentAdmin={adminsMock[0]}
              getInfo={getInfo}
              logoutAction={logoutAction}
              {...props}
            />
          )}
        />
      </Provider>
    </Router>
  </div>
);

describe('Admin.test', () => {
  let getByText;
  let component;

  beforeEach(() => {});

  afterEach(() => {
    cleanup();
    getInfo = jest.fn();
    logoutAction = jest.fn();
  });

  it('Renders CreateOrder when at {match}/createorder', () => {
    component = mount(getPath('/createorder/'));
    expect(component.find(CreateOrder));
  });

  it('Renders Customers when at {match}/customers', () => {
    component = mount(getPath('/customers/'));
    expect(component.find(Customers)).toHaveLength(1);
  });

  it('Renders home when at match', () => {
    component = mount(getPath('/'));
    expect(component.find(Home)).toHaveLength(1);
  });

  it('Renders menu when at {match}/menu', () => {
    component = mount(getPath('/menu/'));
    expect(component.find(AdminMenu)).toHaveLength(1);
  });

  it('Renders settings when at {match}/settings', () => {
    component = mount(getPath('/settings/'));
    expect(component.find(Settings)).toHaveLength(1);
  });
});
