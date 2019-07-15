import { ERROR } from '../actions/types';

const initialState = {
  message: '',
  errorCount: 0,
};

export default function (state = initialState, action) {
  console.log(state.errorCount)
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        message: action.payload,
        errorCount: state.errorCount + 1,
      };
    default:
      return state;
  }
}
