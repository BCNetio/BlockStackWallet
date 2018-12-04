import React from "react";
import { connect } from "react-redux";
import { has } from "ramda";

const WalletInfo = ({ selectedWalletInfo }) => (
  <div>
    Wallet Info
    {has("transactions", selectedWalletInfo) && (
      <div>
        <div>Balance {selectedWalletInfo.balance}</div>
        <div>History</div>
        {selectedWalletInfo.transactions.length
          ? selectedWalletInfo.transactions
          : "not found"}
      </div>
    )}
  </div>
);

const mapStateToProps = state => ({
  selectedWalletInfo: state.initialPage.selectedWalletInfo
});

export default connect(
  mapStateToProps,
  undefined
)(WalletInfo);
