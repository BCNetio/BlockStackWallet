import { createAction } from 'redux-actions';
import { types } from './ActionTypes';

export const fetchWallets = createAction(types.FETCH_WALLETS, () => ({}));

export const fetchMarketInfo = createAction(types.FETCH_MARKET_INFO, pair => ({ pair }));

export const fetchWalletBalance = createAction(types.FETCH_WALLET_BALANCE, (type, address) => ({
  type,
  address,
}));

export const mountActiveTab = createAction(types.MOUNT_ACTIVE_TAB, tabId => ({ tabId }));

export const mountExchangeDetails = createAction(types.MOUNT_EXCHANE_DETAILS, details => ({
  details,
}));

export const fetchStatusExchange = createAction(types.FETCH_CHECK_EXCHANGE, params => ({
  params,
}));

export const makeTransaction = createAction(types.MAKE_TRANSACTION, (wallet, receivers) => ({
  wallet,
  receivers,
}));

export const fetchStatusDeposit = createAction(types.FETTCH_STATUS_DEPOSIT, address => ({
  address,
}));
