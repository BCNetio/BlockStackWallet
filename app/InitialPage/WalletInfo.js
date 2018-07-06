import React from 'react';
import { connect } from 'react-redux';
import { has } from 'ramda';

const WalletInfo = () => (
  <div>
    Wallet Info
    {has('transactions', this.props.selectedWalletInfo) && (
      <div>
        <div>Balance {this.props.selectedWalletInfo.balance}</div>
        <div>History</div>
        {this.props.selectedWalletInfo.transactions.length
          ? this.props.selectedWalletInfo.transactions.map(el => el)
          : 'not found'}
      </div>
    )}
  </div>
);

const mapStateToProps = state => ({
  selectedWallet: state.initialPage.selectedWallet,
  selectedWalletInfo: state.initialPage.selectedWalletInfo,
});

export default connect(mapStateToProps)(WalletInfo);
