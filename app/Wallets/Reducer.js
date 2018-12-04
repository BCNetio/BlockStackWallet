import { combineReducers } from "redux";
import { wallet } from "./Wallet/Reducer";
import { walletList } from "./WalletList/Reducer";

export const wallets = combineReducers({
  wallet,
  walletList
});
