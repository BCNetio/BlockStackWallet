import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { equals, has } from "ramda";
import * as actions from "./Actions";
import { BalanceCard, TapButton } from "../../Views";
import { toFiat } from "../../Providers/Wallets";
import QrPopUp from "./QrPopUp";
import LongMenu from "../WalletList/LongMenu";

const styles = {
  card: {
    minHeight: 242,
    background:
      "linear-gradient(42.6deg, #2B3649 0%, #342F58 56.09%, #5C1B57 80.31%, #812359 100%)",
    boxShadow: "0 25px 40px 0 rgba(0,0,0,0.3)",
    color: "#FFFFFF",
    fontSize: 12,
    textOverflow: "ellipsis",
    padding: "20px",
    paddingBottom: "30px",
    borderRadius: "2px 2px 0 0"
  }
};
const minute = 60000;

class WalletInfo extends React.Component {
  constructor(props) {
    super(props);
    if (
      !this.props.wallet.balance ||
      Date.now() - Date.parse(this.props.wallet.balance.updated) > minute * 5
    ) {
      this.props.fetchWalletInfo(
        this.props.wallet.type,
        this.props.wallet.address
      );
    }
    this.props.getFiat(this.props.wallet.type);
    this.state = { copied: false };
  }

  shouldComponentUpdate(nextProps) {
    return !equals(nextProps, this.props);
  }

  showBalance = () => {
    const balance = this.props.wallet.balance
      ? this.props.wallet.balance.value
      : this.props.walletInfo;
    if (parseFloat(balance)) {
      return balance;
    }
    return 0;
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <BalanceCard>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                color: "#FFFFFF",
                position: "relative"
              }}
            >
              <LongMenu
                callModal={this.props.callModal}
                style={{ marginLeft: "auto", position: "relative" }}
                wallet={this.props.wallet}
                wid={this.props.wallet.wid}
              />
            </div>
            <p className="title">Balance</p>

            <p className="total">
              {this.showBalance()}{" "}
              {this.props.token
                ? this.props.token.name
                : this.props.wallet.type.toUpperCase()}
            </p>
            <p className="currency">
              {has("BTC", this.props.course) &&
                `${toFiat(
                  this.showBalance(),
                  this.props.course[this.props.wallet.type.toUpperCase()]
                    ? this.props.course[this.props.wallet.type.toUpperCase()][
                        this.props.selectedFiat.abbr
                      ]
                    : null
                )} ${this.props.selectedFiat.abbr}`}
            </p>
          </div>
          <div>
            <CopyToClipboard text={this.props.wallet.address}>
              <div>
                <p className="subtitle">
                  Your address
                  <span>Tap to copy</span>
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "stretch"
                  }}
                >
                  <p className="address">{this.props.wallet.address}</p>
                  <TapButton
                    onClick={() =>
                      this.props.callModal(QrPopUp, {
                        address: this.props.wallet.address
                      })
                    }
                  />
                </div>
              </div>
            </CopyToClipboard>
          </div>
        </BalanceCard>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  // wallet: state.wallets.wallet.wallet,
  walletInfo: state.wallets.wallet.walletInfo,
  selectedFiat: state.fiat.selectedFiat,
  course: state.fiat.course
});

const mapDispatchToProps = dispatch => ({
  fetchWalletInfo: (type, addr) =>
    dispatch(actions.fetchWalletInfo(type, addr)),

  getFiat: type => dispatch(actions.fiatCurrency(type))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WalletInfo)
);
