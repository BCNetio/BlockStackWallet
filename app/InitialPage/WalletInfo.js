import React from 'react';
import { connect } from 'react-redux';
import * as actions from './Actions';
import { has } from 'ramda';

class WalletInfo extends React.Component {
  render() {
    return (
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
  }
}

const mapStateToProps = state => ({
  selectedWallet: state.initialPage.selectedWallet,
  selectedWalletInfo: state.initialPage.selectedWalletInfo,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo);
