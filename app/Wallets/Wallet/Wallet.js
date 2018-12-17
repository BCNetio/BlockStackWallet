import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { has } from "ramda";
import wrapedWallet from "../../CommonComponents/Chart";
import * as actions from "./Actions";
import Operations from "./OperationSelector";
import Transactions from "./Transactions";
import WalletInfo from "./WalletInfo";
import { Tokens } from "./Tokens";
import Modal from "../../CommonComponents/Modal";
import { Content } from "../../Views";
import { Column } from "../../CommonComponents/ContentColumn/Index";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    if (props.wallet.wid !== props.match.params.id) {
      props.getWalletInGaia(props.match.params.id);
    }
    this.state = {
      modalContent: null,
      modalOptions: undefined
    };
    this.wallet = props.history.location.state
      ? props.history.location.state
      : props.wallet;
  }

  callModal = (Component, optionalData) => {
    this.setState({ modalContent: Component, modalOptions: optionalData });
  };

  closeModal = () => {
    this.setState({ modalContent: null });
  };

  render() {
    const ModalContent = this.state.modalContent;
    return has("wid", this.wallet) &&
      this.props.match.params.id === this.wallet.wid ? (
      <Content>
        <Modal>
          {this.state.modalContent ? (
            <ModalContent
              closeModal={this.closeModal}
              options={this.state.modalOptions}
            />
          ) : null}
        </Modal>
        <Column left>
          <WalletInfo
            callModal={this.callModal}
            closeModal={this.closeModal}
            wallet={this.wallet}
          />
          <Tokens
            wallet={this.wallet}
            fetchTokens={this.props.fetchTokenInfo}
            callModal={this.callModal}
          />
        </Column>
        <Column middle>
          <Operations wallet={this.wallet} />
          {wrapedWallet(
            this.props.chartData,
            this.props.getDataForChart,
            this.props.selectedFiat,
            this.wallet.type
          )}
        </Column>
        <Column right>
          <Transactions wid={this.props.match.params.id} />
        </Column>
      </Content>
    ) : (
      <CircularProgress />
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.wallets.wallet.chartData,
  wallet: state.wallets.wallet.wallet,
  fiat: state.wallets.wallet.fiat,
  selectedFiat: state.fiat.selectedFiat
});

const mapDispatchToProps = dispatch => ({
  getDataForChart: (currency, period, timestamp, fiat) =>
    dispatch(actions.getDataForChart(currency, period, timestamp, fiat)),

  fetchTokenInfo: (type, address) =>
    dispatch(actions.fetchTokenInfo(type, address)),

  getWalletInGaia: selectedWallet =>
    dispatch(actions.getWalletInGaia(selectedWallet))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
