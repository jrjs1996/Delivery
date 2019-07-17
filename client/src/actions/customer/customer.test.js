import configureStore from 'redux-mock-store';
import * as customerActions from './customer';
import mockAxios from '../../../__mocks__/axios';

const mockStore = configureStore();
const store = mockStore();

describe('Add customer', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches ADD_CUSTOMER with response data', async () => {
    await customerActions.addCustomer({ mockInfo: 'MockInfo' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error on error', async () => {
    mockAxios.giveError(mockAxios.post);
    await customerActions.addCustomer({ mockInfo: 'MockInfo' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Delete customer', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches DELETE_CUSTOMER with customer id', async () => {
    await customerActions.deleteCustomer('Mock id')(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error on error', async () => {
    mockAxios.giveError(mockAxios.delete);
    await customerActions.deleteCustomer({ mockInfo: 'MockInfo' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Fetch customers', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches FETCH_CUSTOMERS with response data', async () => {
    await customerActions.fetchCustomers()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error on error', async () => {
    mockAxios.giveError(mockAxios.get);
    await customerActions.fetchCustomers()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Get current customer info', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_CURRENT_CUSTOMER with response data on success', async () => {
    await customerActions.getCurrentCustomerInfo()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Login', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_CURRENT_CUSTOMER with response data', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ status: 200, data: { mock: 'MockData', token: 'MockToken' } }));
    await customerActions.login({ email: 'TestEmail', password: 'TestPassword' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Logout', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches DELETE_CURRENT_CUSTOMER when successful', () => {
    customerActions.logout()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Update customer', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_CUSTOMER with given data', async () => {
    await customerActions.updateCustomer({ mockData: 'MockData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error on error', async () => {
    mockAxios.giveError(mockAxios.put);
    await customerActions.updateCustomer()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});
