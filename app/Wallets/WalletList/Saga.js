import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getWalletList, logEvent, setWalletList } from '../../Providers/Gaia';
import { types } from './ActionTypes';
import * as dashboard from '../../InitialPage/ActionTypes';
import XHRProvider from '../../Providers/XHRProvider';

const xhr = new XHRProvider();

function* checkoutWallets() {
  const walletList = yield call(getWalletList);
  if (walletList.kpList && walletList.kpList.length) {
    yield put({ type: types.MOUNT_WALLETS, payload: walletList.kpList });
  } else {
    const newWallet = yield setWalletList();
    yield put({ type: types.MOUNT_WALLETS, payload: newWallet });
  }
}

function* createWallet(action) {
  const { walletList, wallet } = action.payload;
  const newWalletList = yield setWalletList([...walletList, wallet]);
  yield call(logEvent, {
    date: new Date(),
    type: 'walletCreate',
    text: `${wallet.type} was created`,
  });
  yield put({ type: dashboard.types.MOUNT_WALLETS, payload: newWalletList });
  yield put({ type: types.MOUNT_WALLETS, payload: newWalletList });
  yield delay(3000);
  yield put({ type: dashboard.types.CHECKOUT_HISTORY, payload: undefined });
}

function* updateWalletByWID(action) {
  const { wallet } = action.payload;
  const { kpList } = yield call(getWalletList);
  const newWalletList = yield setWalletList([...kpList.filter(w => w.wid !== wallet.wid), wallet]);
  yield put({type: types.MOUNT_WALLETS, payload: newWalletList});
}

function* updateWalletList(action) {
  const { walletList } = action.payload;
  const newWalletList = yield setWalletList(walletList);
  yield put({ type: types.MOUNT_WALLETS, payload: newWalletList });
}

function* deleteWallet(action) {
  const { walletList, toBeDeleted } = action.payload;
  const wallet = walletList.find(wallet => wallet.wid === toBeDeleted);

  const newWalletList = yield setWalletList(
    walletList.filter(wallet => wallet.wid !== toBeDeleted),
  );
  yield call(logEvent, {
    date: new Date(),
    type: 'walletCreate',
    text: `${wallet.type} wallet was deleted`,
  });
  yield put({ type: dashboard.types.CHECKOUT_HISTORY, payload: undefined });
  yield put({ type: types.MOUNT_WALLETS, payload: newWalletList });
  yield delay(3000);
  yield put({ type: dashboard.types.CHECKOUT_HISTORY, payload: undefined });
}

function* fetchWalletInfo(action) {
  let walletInfo;
  try {
    walletInfo = yield call(xhr.get, action.payload);
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
  yield put({ type: types.MOUNT_WALLET_INFO, payload: walletInfo.data });
}

export function* walletListSaga() {
  yield takeLatest(types.CHECKOUT_WALLETS, checkoutWallets);
  yield takeLatest(types.CREATE_WALLET, createWallet);
  yield takeLatest(types.DELETE_WALLET, deleteWallet);
  yield takeLatest(types.FETCH_WALLET_INFO, fetchWalletInfo);
  yield takeLatest(types.UPDATE_WALLET_LIST, updateWalletList);
  yield takeLatest(types.UPDATE_WALLET_BY_WID, updateWalletByWID)
}
