import { handleActions } from 'redux-actions';
import { fromJS, setIn, merge } from 'immutable';
import { types } from './ActionTypes';

const initialState = fromJS({
  course: {},
  selectedFiat: { name: 'United States Dollar', abbr: 'USD' },
  fee: 0,
  gas: 0,
});

export const fiat = handleActions(
  {
    [types.MOUNT_COURSE]: (state, { payload }) => setIn(state, ['course'], payload),
    [types.MOUNT_FIAT]: (state, { payload }) => setIn(state, ['selectedFiat'], payload.fiat),
    [types.MOUNT_COURSE_COMISSION]: (state, { payload }) =>
      merge(state, { fee: payload.fee.hourFee * 226, gas: 20 }),
  },
  initialState,
);
