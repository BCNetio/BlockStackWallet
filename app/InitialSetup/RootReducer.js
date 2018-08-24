import { combineReducers } from 'redux';
import { wallets } from '../Wallets/Reducer';
import { dashboard } from '../Dashboard/Reducer';
import { exchange } from '../Exchange/Reducer';
import { fiat } from '../Fiat/Reducer';

export const rootReducer = combineReducers({
  wallets,
  dashboard,
  exchange,
  fiat,
});
