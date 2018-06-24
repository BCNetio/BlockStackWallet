import { handleActions } from 'redux-actions';
import { types } from './ActionTypes';

const initialState = {
  walletList: [],
  selectedWallet: null,
  selectedWalletInfo: {},
  totalBalance: 0,
  dappyHistory: [],
};

export const initialPage = handleActions(
  {
    [types.MOUNT_WALLETS]: (state, action) => ({ ...state, walletList: action.payload }),
    [types.SELECT_WALLET]: (state, action) => ({ ...state, selectedWallet: action.payload }),
    [types.MOUNT_TOTAL_BALANCE]: (state, action) => ({ ...state, totalBalance: action.payload }),
    [types.MOUNT_WALLET_INFO]: (state, action) => ({
      ...state,
      selectedWalletInfo: action.payload,
    }),
    [types.MOUNT_HISTORY]: (state, action) => ({ ...state, dappyHistory: action.payload }),
  },
  initialState,
);
