import { createAction } from 'redux-actions';
import { types } from './ActionTypes';

export const getDataForChart = createAction(
  types.GET_DATA_FOR_CHART,
  (currency, period, timestamp, fiat) => ({
    currency,
    period,
    timestamp,
    fiat,
  }),
);

export const getWalletInGaia = createAction(types.GET_WALLET_IN_GAIA, selectedWallet => ({
  selectedWallet,
}));

export const getWallet = createAction(types.GET_WALLET, wallet => ({ wallet }));

export const fetchTransactions = createAction(types.FECTH_TRANSACTIONS, (address, type) => ({
  address,
  type,
}));

export const makeTransaction = createAction(types.MAKE_TRANSACTION, (wallet, receivers, options) => ({
  wallet,
  receivers,
  options,
}));

export const fiatCurrency = createAction(types.GET_FIAT_CURRENCY, type => ({ type }));

export const fetchWalletInfo = createAction(types.FETCH_WALLET_INFO, (type, addr) => ({
  type,
  addr,
}));

export const updateWalletByAddress = createAction(types.UPDATE_WALLET_BY_ADDRESS, (address, key, value) =>({
  address,
  key,
  value,
}));

export const fetchTokenInfo = createAction(types.FETCH_TOKEN_INFO, (type, addr) => ({
  type,
  addr,
}));
