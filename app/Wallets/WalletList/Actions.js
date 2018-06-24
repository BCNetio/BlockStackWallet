import { createAction } from 'redux-actions';
import { types } from './ActionTypes';

export const checkoutWalletList = createAction(types.CHECKOUT_WALLETS, () => {});

export const fetchWalletInfo = createAction(types.FETCH_WALLET_INFO, wallet => wallet);

export const createWallet = createAction(types.CREATE_WALLET, (walletList, wallet) => ({ walletList, wallet }));

export const updateWalletList = createAction(types.UPDATE_WALLET_LIST, walletList => ({ walletList }));

export const updateWalletByWID = createAction(types.UPDATE_WALLET_BY_WID, wallet => ({ wallet }));

export const deleteWallet = createAction(types.DELETE_WALLET, (walletList, toBeDeleted) => ({
  walletList,
  toBeDeleted,
}));
