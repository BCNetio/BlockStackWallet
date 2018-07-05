import { put, call, takeLatest } from 'redux-saga/effects';
import { head } from 'ramda';
import { delay } from 'redux-saga';
import { types } from './ActionTypes';
import XHRProvider from '../../Providers/XHRProvider';
import { getWalletList, setWalletList, logEvent } from '../../Providers/Gaia';
import { transactionByType, getEthLikeNonce, toSatoshi } from '../../Providers/Wallets';
import { curNames } from '../../AppConfig';

const xhr = new XHRProvider();

function* getSelectWalletInGaia(action) {
  const { selectedWallet } = action.payload;
  try {
    const walletList = yield call(getWalletList);
    const wallet = walletList.kpList.find(wallet => wallet.wid === selectedWallet);
    yield put({
      type: types.GET_WALLET,
      payload: { wallet, walletList: walletList.kpList },
    });
  } catch (error) {
    console.log(error);
  }
}

function* updateWalletByAddress(action) {
  const { address, key, value } = action.payload;
  try {
    const { kpList } = yield call(getWalletList);
    yield setWalletList(
      kpList.map(wallet => (wallet.address === address ? { ...wallet, [key]: value } : wallet)),
    );
  } catch (e) {
    console.log('cannot update wallet on address');
  }
}

function* getDataForChart(action) {
  let chartData;
  try {
    chartData = yield call(xhr.getChartApi, action.payload);
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
  yield put({ type: types.MOUNT_DATA_FOR_CHART, payload: chartData });
}

function* fetchWalletInfo(action) {
  const { type, addr } = action.payload;
  let balance;
  try {
    balance = yield call(xhr.getWalletInfo, type, addr);
    yield updateWalletByAddress(addr, 'balance', {
      updated: new Date(),
      value: balance,
    });
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
  yield put({ type: types.MOUNT_WALLET_INFO, payload: balance });
}

function* fetchTransactions(action) {
  const { address, type } = action.payload;
  let transactions;
  try {
    transactions = yield call(xhr.getTransactions, address, type);
    yield put({ type: types.MOUNT_TRANSACTIONS, payload: transactions });
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
}

function* btcLikeTX({ wallet, receivers, options }) {
  const { data } = yield call(xhr.getUtxo, wallet.type, wallet.address);
  const newResivers = [
    { ...receivers[0], amount: toSatoshi(head(receivers).amount) },
    {
      key: wallet.address,
      amount: toSatoshi(wallet.balance.value) - toSatoshi(head(receivers).amount) - options.fee,
    },
  ];
  const hash = transactionByType.get(wallet.type)(
    wallet.privateKey,
    data,
    newResivers,
    wallet.type,
    options.fee,
  );
  return yield call(xhr.broadcastTX, wallet.type, hash);
}

function* ethLikeTX({ wallet, receivers, options }) {
  const txCount = yield getEthLikeNonce(wallet);
  let hash;
  try {
    hash = transactionByType.get(wallet.type)
      ? transactionByType.get(wallet.type)(
          wallet.privateKey,
          txCount,
          receivers,
          wallet.type,
          options.gasPrice,
          options.gasLimit,
        )
      : transactionByType.get('token')(
          wallet,
          txCount,
          receivers,
          wallet.type,
          options.gasPrice,
          options.gasLimit,
        );
  } catch (e) {
    console.log(e);
    hash =
      wallet.type === curNames.ETC
        ? { transactionHash: e.toString().match(/"transactionHash"[:]\s+"([^\s,]+)"/)[1] }
        : { transactionHash: e.toString().match(/"blockHash"[:]\s+"([^\s,]+)"/)[1] };
  }

  const ethHash = hash => ({
    data: { txid: hash.transactionHash ? hash.transactionHash : hash.result.blockHash },
  });
  return ethHash(hash);
}

function* makeTransaction(action) {
  const { wallet } = action.payload;

  let txid;

  if (wallet.type.toUpperCase()) {
    txid =
      wallet.type === curNames.ETH || wallet.type === curNames.ETC
        ? yield ethLikeTX(action.payload)
        : yield btcLikeTX(action.payload);
  } else {
    txid = yield ethLikeTX(action.payload);
  }
  if (txid !== undefined) {
    const id = txid.data ? txid.data.txid : txid.txid;
    yield call(logEvent, { date: new Date(), type: 'txPerformed', text: action.payload });
    yield put({ type: types.MOUNT_TRX_ID, payload: { txid: id, status: 'Finished' } });
  } else {
    yield put({ type: types.MOUNT_TRX_ID, payload: { txid: '', status: 'Failed' } });
  }
}

function* fetchTokenInfo(action) {
  const { type, addr } = action.payload;
  let data;
  try {
    data = yield call(xhr.getTokenList, type, addr);
  } catch (e) {
    yield delay(5000);
    yield put(action);
  }
  yield updateWalletByAddress({
    action: types.UPDATE_WALLET_BY_ADDRESS,
    payload: {
      address: addr,
      key: 'tokens',
      value: {
        updated: new Date(),
        tokenList: data.tokens || [],
      },
    },
  });
  yield put({ type: types.MOUNT_TOKEN_INFO, payload: data.tokens || [] });
}

export function* walletSaga() {
  yield takeLatest(types.GET_DATA_FOR_CHART, getDataForChart);
  yield takeLatest(types.FETCH_WALLET_INFO, fetchWalletInfo);
  yield takeLatest(types.FECTH_TRANSACTIONS, fetchTransactions);
  yield takeLatest(types.GET_WALLET_IN_GAIA, getSelectWalletInGaia);
  yield takeLatest(types.MAKE_TRANSACTION, makeTransaction);
  yield takeLatest(types.FETCH_TOKEN_INFO, fetchTokenInfo);
  yield takeLatest(types.UPDATE_WALLET_BY_ADDRESS, updateWalletByAddress);
}
