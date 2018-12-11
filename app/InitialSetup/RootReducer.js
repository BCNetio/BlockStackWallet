import { combineReducers } from "redux";
import { wallets } from "../Wallets/Reducer";
import { initialPage } from "../InitialPage/Reducer";
import { exchange } from "../Exchange/Reducer";
import { fiat } from "../Fiat/Reducer";
import { newsCard } from "../InitialPage/NewsCard";

export const rootReducer = combineReducers({
  wallets,
  initialPage,
  exchange,
  fiat,
  newsCard
});
