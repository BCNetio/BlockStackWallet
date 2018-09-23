import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { types } from './ActionTypes';

const initialState = fromJS({
  walletList: [],
  selectedWallet: null,
  selectedWalletInfo: {},
  totalBalance: 0,
  dappyHistory: [],
});

export const dashboard = handleActions(
  {
    [types.MOUNT_WALLETS]: (state, { payload }) =>
      state.update('walletList', () => fromJS(payload)),
    [types.SELECT_WALLET]: (state, { payload }) => state.update('selectedWallet', () => payload),
    [types.MOUNT_TOTAL_BALANCE]: (state, { payload }) =>
      state.update('totalBalance', () => payload),
    [types.MOUNT_WALLET_INFO]: (state, { payload }) =>
      state.update('selectedWalletInfo', () => payload),
    [types.MOUNT_HISTORY]: (state, { payload }) => state.update('dappyHistory', () => payload),
  },
  initialState,
);
