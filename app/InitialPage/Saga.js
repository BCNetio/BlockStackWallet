import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getWalletList, setWalletList, initLog, getLogs, logEvent } from '../Providers/Gaia';
import { types } from './ActionTypes';
import { walletGenerator, calculateTotalBalance } from '../Providers/Wallets';
import XHRProvider from '../Providers/XHRProvider';

const xhr = new XHRProvider();

function* checkoutWallets() {
  const walletList = yield call(getWalletList);
  if (walletList) {
    yield put({ type: types.MOUNT_WALLETS, payload: walletList.kpList });
  } else {
    const newWallet = yield setWalletList();
    yield put({ type: types.MOUNT_WALLETS, payload: newWallet });
  }
}

function* checkoutHistory() {
  let logs = yield call(getLogs);
  if (!logs) {
    yield call(initLog);
    logs = [];
  }
  yield put({ type: types.MOUNT_HISTORY, payload: Array.isArray(logs) ? logs : [logs] });
}

function* createWallet(action) {
  const { walletList, wType } = action.payload;
  const newWalletList = yield setWalletList([...walletList, ...walletGenerator([wType])]);
  yield call(logEvent, {
    date: new Date(),
    type: 'walletCreate',
    text: `${wType} wallet was created`,
  });
  yield put({ type: types.MOUNT_WALLETS, payload: newWalletList });
}

function* deleteWallet(action) {
  const { walletList, toBeDeleted } = action.payload;
  const newWalletList = yield setWalletList(
    walletList.filter(wallet => wallet.wid !== toBeDeleted),
  );
  yield put({ type: types.MOUNT_WALLETS, payload: newWalletList });
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

function* fetchTotalBalance(action) {
  const { listOfAddress, course } = action.payload;
  let sumOfType;
  try {
    sumOfType = yield call(xhr.getTotalBalance, listOfAddress, course);
    const balanceObj = sumOfType.reduce(
      (acc, { wid, balance }) => ({ ...acc, [wid]: balance }),
      {},
    );
    const walletsWithBalance = listOfAddress.map(wallet => ({
      ...wallet,
      balance: {
        updated: new Date(),
        value: balanceObj[wallet.wid],
      },
    }));
    listOfAddress.length ? yield setWalletList(walletsWithBalance) : null;
    yield put({
      type: types.MOUNT_TOTAL_BALANCE,
      payload: calculateTotalBalance(sumOfType),
    });
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
}

export function* initialPageSaga() {
  yield takeLatest(types.CHECKOUT_WALLETS, checkoutWallets);
  yield takeLatest(types.CREATE_WALLET, createWallet);
  yield takeLatest(types.DELETE_WALLET, deleteWallet);
  yield takeLatest(types.FETCH_WALLET_INFO, fetchWalletInfo);
  yield takeLatest(types.FETCH_TOTAL_BALANCE, fetchTotalBalance);
  yield takeLatest(types.CHECKOUT_HISTORY, checkoutHistory);
}
