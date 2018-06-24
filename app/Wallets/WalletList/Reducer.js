import { handleActions } from 'redux-actions';
import { types } from './ActionTypes';

const initialState = {
  walletList: [],
  selectedWallet: null,
  selectedWalletInfo: {},
};

export const walletList = handleActions(
  {
    [types.MOUNT_WALLETS]: (state, action) => ({ ...state, walletList: action.payload }),
    [types.SELECT_WALLET]: (state, action) => ({ ...state, selectedWallet: action.payload }),
    [types.MOUNT_WALLET_INFO]: (state, action) => ({
      ...state,
      selectedWalletInfo: action.payload,
    }),
  },
  initialState,
);
