import customerReducer from './customer';
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  UPDATE_CURRENT_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../../actions/types';
import { customersMock } from '../../tests/mocks';

const createState = (items, currentCustomer) => ({
  items,
  currentCustomer,
});

const createAction = (type, payload) => ({
  payload,
  type,
});

describe('Customer reducer', () => {
  it('Initial state is empty', () => {
    const initialState = customerReducer(undefined, 'FAKE_ACTION');
    expect(initialState).toMatchSnapshot();
  });

  it("Returns given state when an action doesn't match", () => {
    const state = customerReducer({ mockState: 'MockState' }, 'FAKE_ACTION');
    expect(state).toMatchSnapshot();
  });

  it('Adds customer when calling ADD_CUSTOMER', () => {
    const initialItems = { [customersMock[0]._id]: customersMock[0] };
    const state = createState(initialItems, undefined);
    const action = createAction(ADD_CUSTOMER, customersMock[1]);
    expect(customerReducer(state, action)).toMatchSnapshot();
  });

  it('Removes customer when calling DELETE_CUSTOMER', () => {
    const initialItems = {
      [customersMock[0]._id]: customersMock[0],
      [customersMock[1]._id]: customersMock[1],
    };
    const state = createState(initialItems, undefined);
    const action = createAction(DELETE_CUSTOMER, customersMock[0]);
    expect(customerReducer(state, action)).toMatchSnapshot();
  });

  it('Populates items when calling FETCH_CUSTOMERS', () => {
    const action = createAction(FETCH_CUSTOMERS, customersMock);
    expect(customerReducer(createState(), action)).toMatchSnapshot();
  });

  it('Updates current customer to be payload when calling UPDATE__CURRENT_CUSTOMER', () => {
    const state = createState(undefined, { name: 'InitialCurrentCustomer' });
    const action = createAction(UPDATE_CURRENT_CUSTOMER, { name: 'NewCurrentCustomer' });
    expect(customerReducer(state, action)).toMatchSnapshot();
  });

  it('Updates given customer in items to be payload when calling UPDATE_CUSTOMER', () => {
    const initialItems = {
      [customersMock[0]._id]: customersMock[0],
      [customersMock[1]._id]: customersMock[1],
    };
    const state = createState(initialItems, undefined);
    const action = createAction(UPDATE_CUSTOMER, {
      _id: customersMock[0]._id,
      firstName: 'UPDATED INFO',
    });
    expect(customerReducer(state, action)).toMatchSnapshot();
  });
});
