import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { types } from './ActionTypes';

const initialState = fromJS({
  chartData: [],
  walletInfo: {},
  wallet: {},
  transactions: [],
  walletList: [],
  trxId: '',
  status: 'Pending',
});

export const wallet = handleActions(
  {
    [types.MOUNT_DATA_FOR_CHART]: (state, { payload }) => state.update('chartData', () => payload),
    [types.GET_WALLET]: (state, { payload }) =>
      state.merge(state, { wallet: payload.wallet, walletList: payload.walletList }),
    [types.MOUNT_WALLET_INFO]: (state, { payload }) => state.update('walletInfo', () => payload),
    [types.MOUNT_TRX_ID]: (state, { payload }) =>
      state.merge(state, { trxId: payload.txid, status: payload.status }),
    [types.MOUNT_TRANSACTIONS]: (state, { payload }) =>
      state.update('transactions', tx => tx.merge(payload)),
    [types.MOUNT_TOKEN_INFO]: (state, { payload }) =>
      state.updateIn(state, ['wallet', 'tokens'], () => ({
        updated: new Date(),
        tokenList: payload,
      })),
  },
  initialState,
);
