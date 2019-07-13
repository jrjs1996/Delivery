import configureStore from 'redux-mock-store';
import * as menuActions from './menu';
import * as actionTypes from '../types';
import mockAxios from '../../../__mocks__/axios';

const mockStore = configureStore();
const store = mockStore();

describe('Add menu item', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches ADD_MENU_ITEM with payload of response data on success', async () => {
    await menuActions.addMenuItem({ mockPostData: 'MockPostData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.post);
    await menuActions.addMenuItem({ mockPostData: 'MockPostData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Delete menu item', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches DELETE_MENU item with payload of given menu item number', async () => {
    await menuActions.deleteMenuItem(1234)(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.delete);
    await menuActions.deleteMenuItem(1234)(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Fetch menu', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches FETCH_MENU with payload of response data', async () => {
    await menuActions.fetchMenu()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.get);
    await menuActions.fetchMenu()(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Update menu item', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_MENU_ITEM with payload of response data', async () => {
    await menuActions.updateMenuItem({ mockPutData: 'MockPutData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.put);
    await menuActions.updateMenuItem({ mockPutData: 'MockPutData' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('Upload menu item image', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('Dispatches UPDATE_MENU_ITEM with payload of response data', async () => {
    await menuActions.uploadMenuItemImage(1234, { mockFileInfo: 'MockFileInfo' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Dispatches ERROR on error', async () => {
    mockAxios.giveError(mockAxios.post);
    await menuActions.uploadMenuItemImage(1234, { mockFileInfo: 'MockFileInfo' })(store.dispatch);
    expect(store.getActions()).toMatchSnapshot();
  });
});
