import { handleActions } from 'redux-actions';
import { types } from './ActionTypes';

const initialState = {
  course: {},
  selectedFiat: { name: 'United States Dollar', abbr: 'USD' },
  fee: 0,
  gas: 0,
};

const TYPICAL_TX_SIZE = 226;

export const fiat = handleActions(
  {
    [types.MOUNT_COURSE]: (state, action) => ({ ...state, course: action.payload }),
    [types.MOUNT_FIAT]: (state, action) => ({ ...state, selectedFiat: action.payload.fiat }),
    [types.MOUNT_COURSE_COMISSION]: (state, action) => ({
      ...state,
      fee: action.payload.fee.hourFee * TYPICAL_TX_SIZE,
      gas: 20,
    }),
  },

  initialState,
);
