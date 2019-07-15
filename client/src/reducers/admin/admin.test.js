import adminReducer from './admin';
import {
  ADD_ADMIN, CREATE_ADMIN, DELETE_CURRENT_ADMIN, FETCH_ADMINS, UPDATE_ADMIN, UPDATE_CURRENT_ADMIN,
} from '../../actions/types';
import { adminsMock, createAction } from '../../tests/mocks';

const createState = (admins, currentAdmin) => ({
  admins,
  currentAdmin,
});

describe('Admin reducer', () => {
  it('Initial state is empty', () => {
    const initialState = adminReducer(undefined, 'FAKE_ACTION');
    expect(initialState).toMatchSnapshot();
  });

  it("Returns given state when an action doesn't match", () => {
    const state = adminReducer({ mockState: 'MockState' }, 'FAKE_ACTION');
    expect(state).toMatchSnapshot();
  });

  it('Inserts admin into admins when calling CREATE_ADMIN', () => {
    const initialAdmins = { [adminsMock[0]._id]: adminsMock[0] };
    const state = createState(initialAdmins, undefined);
    const action = createAction(CREATE_ADMIN, adminsMock[1]);
    expect(adminReducer(state, action)).toMatchSnapshot();
  });

  it('Removes the current admin when calling DELETE_CURRENT_ADMIN', () => {
    const state = createState(undefined, adminsMock[0]);
    const action = createAction(DELETE_CURRENT_ADMIN);
    expect(adminReducer(state, action)).toMatchSnapshot();
  });

  it('Populates admins when calling FETCH_ADMINS', () => {
    const state = createState({}, {});
    const action = createAction(FETCH_ADMINS, adminsMock);
    expect(adminReducer(state, action)).toMatchSnapshot();
  });

  it('Updates given admin in admins when calling UPDATE_ADMIN', () => {
    const initialAdmins = {
      [adminsMock[0]._id]: adminsMock[0],
      [adminsMock[1]._id]: adminsMock[1],
    };
    const state = createState(initialAdmins, undefined);
    const action = createAction(UPDATE_ADMIN, { _id: adminsMock[0]._id, username: 'UPDATED_INFO' });
    expect(adminReducer(state, action)).toMatchSnapshot();
  });

  it('Updates current admin when calling UPDATE_CURRENT_ADMIN', () => {
    const state = createState(undefined, { username: 'INIT_ADMIN' });
    const action = createAction(UPDATE_CURRENT_ADMIN, { username: 'UPDATED_INFO' });
    expect(adminReducer(state, action)).toMatchSnapshot();
  });
});
