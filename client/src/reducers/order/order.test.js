import orderReducer from './order';
import {
  ADD_ORDER, FETCH_ORDERS, UPDATE_ORDER, ADD_CUSTOMER,
} from '../../actions/types';
import { ordersMock, createAction } from '../../tests/mocks';

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

  it('Populates orders when calling FETCH_ORDERS', () => {
    const action = createAction(FETCH_ORDERS, ordersMock);
    expect(orderReducer(createState(), action)).toMatchSnapshot();
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
