import React from "react";
import { connect } from "react-redux";
import {
  Popup,
  PopupLayout,
  CloseUpButton,
  PopupButton,
  InputGrey
} from "../../Views";
import { updateWalletByAddress } from "./Actions";

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList
});

const mapDispatchToProps = dispatch => ({
  update: (address, key, value) =>
    dispatch(updateWalletByAddress(address, key, value))
});

class AddCustomEthToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      name: "",
      symbol: "",
      decimals: "",
      price: {}
    };
  }

  handleChange = (target, value) => {
    this.setState({ [target]: value });
  };

  update = () => {
    const { options } = this.props;
    const tokens = options.wallet.tokens
      ? {
          ...options.wallet.tokens,
          tokenList: [
            ...options.wallet.tokens.tokenList,
            { balance: 0, tokenInfo: this.state }
          ]
        }
      : {
          updated: new Date(),
          tokenList: [{ balance: 0, tokenInfo: this.state }]
        };
    this.props.update(options.wallet.address, "tokens", tokens);
    this.props.closeModal();
  };

  render() {
    return (
      <PopupLayout>
        <Popup>
          <CloseUpButton onClick={this.props.closeModal} />
          <p className="title">
            Add custom token to {this.props.options.wallet.alias}
          </p>
          <InputGrey
            type="text"
            placeholder="Contract address"
            value={this.state.contractAddress}
            onChange={e => this.handleChange("address", e.currentTarget.value)}
          />
          <InputGrey
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={e => this.handleChange("name", e.currentTarget.value)}
          />
          <InputGrey
            type="text"
            placeholder="Symbol"
            value={this.state.symbol}
            onChange={e => this.handleChange("symbol", e.currentTarget.value)}
          />
          <InputGrey
            type="text"
            placeholder="Decimals"
            value={this.state.decimals}
            onChange={e => this.handleChange("decimals", e.currentTarget.value)}
          />
          <PopupButton onClick={this.update}>OK</PopupButton>
        </Popup>
      </PopupLayout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCustomEthToken);
