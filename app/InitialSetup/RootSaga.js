import { all, call } from 'redux-saga/effects';
import { dashboardSaga } from '../Dashboard/Saga';
import { walletSaga } from '../Wallets/Wallet/Saga';
import { walletListSaga } from '../Wallets/WalletList/Saga';
import { exchangeSaga } from '../Exchange/Saga';
import { fiatSaga } from '../Fiat/Saga';

export default function* rootSaga() {
  yield all([
    call(dashboardSaga),
    call(walletListSaga),
    call(walletSaga),
    call(exchangeSaga),
    call(fiatSaga),
  ]);
}
