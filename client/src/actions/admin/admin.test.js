import configureStore from 'redux-mock-store';
import * as adminActions from './admin';
import * as actionTypes from '../types';
import mockAxios from '../../../__mocks__/axios';

const mockStore = configureStore();
const store = mockStore();

describe('Create admin', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful', async () => {
    mockAxios.post.mockImplementationOnce((url, postData) => Promise.resolve({
      data: { username: postData.username },
    }));

    await adminActions.createAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.post);
    await adminActions.createAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Fetch Admins', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful (Payload is res data)', async () => {
    await adminActions.fetchAdmins()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.get);
    await adminActions.fetchAdmins()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Get current admin info', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful (Payload is res data)', async () => {
    await adminActions.getCurrentAdminInfo()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.get);
    await adminActions.getCurrentAdminInfo()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Login', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful (Payload is provided username)', async () => {
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ status: 200, data: { mock: 'MockData', token: 'MockToken' } });
    });
    await adminActions.login({ username: 'TestUsername', password: 'TestPassword' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.post);
    await adminActions.login({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });
});


describe('Update current admin', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful (Payload is res data)', async () => {
    await adminActions.updateCurrentAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.put);
    await adminActions.updateCurrentAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('updateAdmin', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches correct info when successful (Payload is submitted data)', async () => {
    await adminActions.updateAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches error when unsuccessful', async () => {
    mockAxios.giveError(mockAxios.put);
    await adminActions.updateAdmin({
      username: 'TestUser',
      password: 'TestPassword',
    })(store.dispatch);

    expect(store.getActions()).toMatchSnapshot();
  });
});
