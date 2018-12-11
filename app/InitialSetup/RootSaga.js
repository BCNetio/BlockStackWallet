import { all, call } from "redux-saga/effects";
import { initialPageSaga } from "../InitialPage/Saga";
import { walletSaga } from "../Wallets/Wallet/Saga";
import { walletListSaga } from "../Wallets/WalletList/Saga";
import { exchangeSaga } from "../Exchange/Saga";
import { fiatSaga } from "../Fiat/Saga";
import { newsCardSaga } from "../InitialPage/NewsCard";

export default function* rootSaga() {
  yield all([
    call(initialPageSaga),
    call(walletListSaga),
    call(walletSaga),
    call(exchangeSaga),
    call(fiatSaga),
    call(newsCardSaga)
  ]);
}
