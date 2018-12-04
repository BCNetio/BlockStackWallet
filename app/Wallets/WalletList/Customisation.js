import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { head, take } from "ramda";
import { generateMnemonic } from "bip39";
import { updateWalletList } from "./Actions";
import { PopupLayout, PopupButton, Popup, CloseUpButton } from "../../Views";
import { config } from "../../AppConfig";

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList
});

const mapDispatchToProps = dispatch => ({
  update: wallets => dispatch(updateWalletList(wallets))
});

const styles = {
  input: {
    width: "100%"
  }
};

class Customisation extends React.Component {
  constructor(props) {
    super(props);
    const gaiaWallet = head(
      props.wallets.filter(wallet => wallet.wid === props.options.wid)
    );
    this.state = {
      wallet: gaiaWallet,
      alias: gaiaWallet.alias ? gaiaWallet.alias : ""
    };
  }

  generateRandomPair = () =>
    config.avCurrencyes.get(this.state.wallet.type).name +
    " " +
    take(2, generateMnemonic().split(" ")).join("-");

  handleChange = e => {
    const value = e.currentTarget.value;
    this.setState({ alias: value });
  };

  saveUpdates = () => {
    const newWallets = this.props.wallets.map(wallet =>
      wallet.wid === this.props.options.wid
        ? {
            ...this.state.wallet,
            alias: this.state.alias
              ? this.state.alias
              : this.generateRandomPair()
          }
        : wallet
    );
    this.props.update(newWallets);
    this.props.closeModal();
  };

  render() {
    return (
      <PopupLayout>
        <Popup>
          <CloseUpButton onClick={this.props.closeModal} />
          <TextField
            onChange={this.handleChange}
            value={this.state.alias}
            label="Alias"
            helperText="Please select alias for this wallet."
            style={styles.input}
          />
          <PopupButton onClick={this.saveUpdates}>Rename wallet</PopupButton>
        </Popup>
      </PopupLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customisation);
