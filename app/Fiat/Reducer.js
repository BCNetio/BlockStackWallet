import { handleActions } from 'redux-actions';
import { fromJS, merge } from 'immutable';
import { types } from './ActionTypes';

const initialState = fromJS({
  course: {},
  selectedFiat: { name: 'United States Dollar', abbr: 'USD' },
  fee: 0,
  gas: 0,
});

export const fiat = handleActions(
  {
    [types.MOUNT_COURSE]: (state, { payload }) => state.update('course', () => fromJS(payload)),
    [types.MOUNT_FIAT]: (state, { payload }) =>
      state.update('selectedFiat', () => fromJS(payload.fiat)),
    [types.MOUNT_COURSE_COMISSION]: (state, { payload }) =>
      merge(state, { fee: payload.fee.hourFee * 226, gas: 20 }),
  },
  initialState,
);
