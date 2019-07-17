import orderReducer from './order';
import {
  ADD_ORDER,
  FETCH_ORDERS,
  UPDATE_ORDER,
  ADD_CUSTOMER,
  ADD_TO_CURRENT_ORDER,
  REMOVE_FROM_CURRENT_ORDER,
} from '../../actions/types';
import { ordersMock, createAction, menuItemsMock } from '../../tests/mocks';

const createState = (items, currentOrder) => ({
  items,
  currentOrder,
});

describe('Order reducer', () => {
  it('Initial state is empty', () => {
    const initialState = orderReducer(undefined, 'FAKE_ACTION');
    expect(initialState).toMatchSnapshot();
  });

  it("Returns given state when an action doesn't match", () => {
    const state = orderReducer({ mockState: 'MockState' }, 'FAKE_ACTION');
    expect(state).toMatchSnapshot();
  });

  it('Adds given order when calling ADD_ORDER', () => {
    const initialItems = { [ordersMock[0]._id]: ordersMock[0] };
    const state = createState(initialItems, undefined);
    const action = createAction(ADD_ORDER, ordersMock[1]);
    expect(orderReducer(state, action)).toMatchSnapshot();
  });

  it(`Adds item to current order with a count of 1 when currentOrder
      is empty and calling ADD_TO_CURRENT_ORDER`, () => {
    const action = createAction(ADD_TO_CURRENT_ORDER, menuItemsMock[0]);
    expect(orderReducer(undefined, action)).toMatchSnapshot();
  });

  it(`Adds to the items count when calling ADD_TO_CURRENT_ORDER and the
      item is already in the order`, () => {
    const initialCurrentOrder = {
      [menuItemsMock[0]._id]: {
        item: menuItemsMock[0],
        count: 1,
      },
    };
    const state = createState(undefined, initialCurrentOrder);
    const action = createAction(ADD_TO_CURRENT_ORDER, menuItemsMock[0]);
    expect(orderReducer(state, action)).toMatchSnapshot();
  });

  it('Populates orders when calling FETCH_ORDERS', () => {
    const action = createAction(FETCH_ORDERS, ordersMock);
    expect(orderReducer(createState(), action)).toMatchSnapshot();
  });

  it(`REMOVE_FROM_CURRENT_ORDER item count when
      removing an item from order and count is > 1`, () => {
    const initialCurrentOrder = {
      [menuItemsMock[0]._id]: {
        item: menuItemsMock[0],
        count: 2,
      },
    };
    const state = createState(undefined, initialCurrentOrder);
    const action = createAction(REMOVE_FROM_CURRENT_ORDER, menuItemsMock[0]._id);
    expect(orderReducer(state, action)).toMatchSnapshot();
  });

  it(`REMOVE_FROM_CURRENT_ORDER removes item when
      removing an item from order and count is <= 1`, () => {
    const initialCurrentOrder = {
      [menuItemsMock[0]._id]: {
        item: menuItemsMock[0],
        count: 1,
      },
    };
    const state = createState(undefined, initialCurrentOrder);
    const action = createAction(REMOVE_FROM_CURRENT_ORDER, menuItemsMock[0]._id);
    expect(orderReducer(state, action)).toMatchSnapshot();
  });

  it('Updates given order in items to be payload when calling UPDATE_ORDER', () => {
    const initialItems = {
      [ordersMock[0]._id]: ordersMock[0],
      [ordersMock[1]._id]: ordersMock[1],
    };
    const state = createState(initialItems, undefined);
    const action = createAction(UPDATE_ORDER, {
      _id: ordersMock[0]._id,
      address: 'UPDATED INFO',
    });
    expect(orderReducer(state, action)).toMatchSnapshot();
  });
});
