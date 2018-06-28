import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { has } from 'ramda';
import { types } from './ActionTypes';
import XHRProvider from '../Providers/XHRProvider';
import { getWalletList } from '../Providers/Gaia';
import { transactionByType } from '../Providers/Wallets';

const xhr = new XHRProvider();

function* fetchWallets(action) {
  try {
    const walletList = yield call(getWalletList);
    yield put({
      type: types.MOUNT_WALLETS,
      payload: walletList.kpList,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fecthWalletBalance(action) {
  const wallet = yield call(xhr.getWalletInfo, action.payload.type, action.payload.address);
  yield put({ type: types.MOUNT_WALLET_BALANCE, payload: wallet });
}

function* fetchMarketInfo(action) {
  const marketInfo = yield call(xhr.getMarketInfo, action.payload.pair);
  yield put({ type: types.MOUNT_MARKET_INFO, payload: marketInfo });
}

function* fetchCheckExchange(action) {
  try {
    const exchange = yield call(xhr.checkExchange, action.payload.params);
    has('success', exchange)
      ? yield put({
        type: types.MOUNT_EXCHANGE_CHECK,
        payload: exchange.success,
      })
      : yield put({
        type: types.MOUNT_EXCHANGE_CHECK_ERROR,
        payload: exchange.error,
      });
  } catch (error) {
    console.log(error);
  }
}

function* makeTransaction(action) {
  const { wallet, receivers } = action.payload;
  const { data } = yield call(xhr.getUtxo, wallet.type, wallet.address);
  const hash = transactionByType.get(wallet.type)(wallet.privateKey, data, receivers, wallet.type);
  const e = yield call(xhr.broadcastTX, wallet.type, hash);
  yield e;
}

function* fetchStatusDeposit(action) {
  yield put({
    type: types.MOUNT_STATUS_DEPOSIT,
    payload: 'Pending',
  });
  try {
    while (true) {
      const data = yield call(xhr.checkStatusDeposit, action.payload.address);
      yield call(delay, 10000);
      if (data.status === 'complete') {
        yield put({
          type: types.MOUNT_STATUS_DEPOSIT,
          payload: 'Finished',
        });
        break;
      }
    }
  } catch (error) {
    yield put({
      type: types.MOUNT_STATUS_DEPOSIT,
      payload: 'Failed',
    });
  }
}

export function* exchangeSaga() {
  yield takeLatest(types.FETCH_WALLET_BALANCE, fecthWalletBalance);
  yield takeLatest(types.FETCH_WALLETS, fetchWallets);
  yield takeLatest(types.FETCH_MARKET_INFO, fetchMarketInfo);
  yield takeLatest(types.FETCH_CHECK_EXCHANGE, fetchCheckExchange);
  yield takeLatest(types.MAKE_TRANSACTION, makeTransaction);
  yield takeLatest(types.FETTCH_STATUS_DEPOSIT, fetchStatusDeposit);
}
