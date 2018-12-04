import React from "react";
import { connect } from "react-redux";
import { head } from "ramda";
import { Popup, PopupLayout, CloseUpButton, PopupButton } from "../../Views";

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList
});

class PrivateKey extends React.Component {
  constructor(props) {
    super(props);
    this.gaiaWallet = head(
      props.wallets.filter(wallet => wallet.wid === props.options.wid)
    );
  }

  render() {
    return (
      <PopupLayout>
        <Popup>
          <CloseUpButton onClick={this.props.closeModal} />
          <p className="title">The wallet private key</p>
          <p className="description key">{this.gaiaWallet.privateKey}</p>
          <PopupButton onClick={this.props.closeModal}>OK</PopupButton>
        </Popup>
      </PopupLayout>
    );
  }
}

export default connect(mapStateToProps)(PrivateKey);
