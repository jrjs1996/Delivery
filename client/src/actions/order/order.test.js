import configureStore from 'redux-mock-store';
import * as orderActions from './order';
import * as actionTypes from '../types';
import mockAxios from '../../../__mocks__/axios';
import { menuItemsMock } from '../../tests/mocks';

const mockStore = configureStore();
const store = mockStore();

describe('Add to current order', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches ADD_TO_CURRENT_ORDER with item as payload', () => {
    orderActions.addToCurrentOrder(menuItemsMock[0])(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Create order', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches ADD_ORDER with payload of response data on success', async () => {
    await orderActions.createOrder({ mockPostData: 'MockPostData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.post);
    await orderActions.createOrder({ mockPostData: 'MockPostData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Delete Current Order', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches DELETE_CURRENT_ORDER', () => {
    orderActions.deleteCurrentOrder()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Fetch open orders', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches FETCH_ORDERS with response data on success', async () => {
    await orderActions.fetchOpenOrders()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.get);
    await orderActions.fetchOpenOrders()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Fetch orders', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches FETCH_ORDERS with response data on success', async () => {
    await orderActions.fetchOrders()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.get);
    await orderActions.fetchOrders()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Remove from current order', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches REMOVE_FROM_CURRENT_ORDER with the given id', () => {
    orderActions.removeFromCurrentOrder('TestId')(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Update order', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_ORDER with given id and putdata on success', async () => {
    await orderActions.updateOrder(1234, { mockPutData: 'MockPutData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.put);
    await orderActions.updateOrder({ mockPutData: 'MockPutData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});
