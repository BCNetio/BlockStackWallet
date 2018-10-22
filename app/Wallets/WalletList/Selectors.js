import { createSelector } from 'reselect';
import { config } from '../../AppConfig';
import { toFiat } from '../../Providers/Wallets';

export const walletsSelector = state => state.wallets.walletList.get('walletList');

export const getCourse = state => state.fiat.get('course');

export const getSelectedFiat = state => state.fiat.getIn(['selectedFiat', 'abbr']);

export const getWalletWithFiat = createSelector(
  walletsSelector,
  getCourse,
  getSelectedFiat,
  (wallets, course, fiat) =>
    wallets.map(wallet =>
      wallet.set(
        'fiat',
        toFiat(
          wallet.getIn(['balance', 'value']),
          course.getIn([wallet.get('type').toUpperCase(), fiat]),
        ),
      ),
    ),
);
