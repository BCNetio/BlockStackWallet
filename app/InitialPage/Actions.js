import { createAction } from "redux-actions";
import { types } from "./ActionTypes";

export const checkoutWalletList = createAction(
  types.CHECKOUT_WALLETS,
  () => {}
);

export const deleteWallet = createAction(
  types.DELETE_WALLET,
  (walletList, toBeDeleted) => ({
    walletList,
    toBeDeleted
  })
);

export const selectWallet = createAction(types.SELECT_WALLET, wallet => wallet);

export const fetchWalletInfo = createAction(
  types.FETCH_WALLET_INFO,
  wallet => wallet
);

export const checkoutHistory = createAction(
  types.CHECKOUT_HISTORY,
  () => undefined
);

export const fetchTotalBalance = createAction(
  types.FETCH_TOTAL_BALANCE,
  (listOfAddress, course) => ({
    listOfAddress,
    course
  })
);
