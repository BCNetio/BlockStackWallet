import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { types } from './ActionTypes';

const initialState = fromJS({
  walletList: [],
  selectedWallet: null,
  selectedWalletInfo: {},
});

export const walletList = handleActions(
  {
    [types.MOUNT_WALLETS]: (state, { payload }) =>
      state.update('walletList', () => fromJS(payload)),
    [types.SELECT_WALLET]: (state, action) => ({ ...state, selectedWallet: action.payload }),
    [types.MOUNT_WALLET_INFO]: (state, action) => ({
      ...state,
      selectedWalletInfo: action.payload,
    }),
  },
  initialState,
);
