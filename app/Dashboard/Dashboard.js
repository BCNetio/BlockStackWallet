import React from 'react';
import { connect } from 'react-redux';
import * as actions from './Actions';
import { fiatCurrency, getDataForChart } from '../Wallets/Wallet/Actions';
import { News } from './News';
import ListOfWallets from './ListOfWallets';
import wrapedChart from '../CommonComponents/Chart';
import { SummaryCash } from './SummaryCash';
import { config, curNames } from '../AppConfig';
import History from './History';
import Modal from '../CommonComponents/Modal';
import {
  Content,
  LeftColumnContainer,
  MiddleColumnContainer,
  RightColumnContainer,
} from '../Views';

const mapDispatchToProps = dispatch => ({
  checkoutWallets: () => dispatch(actions.checkoutWalletList()),
  createWallet: (walletList, wType) => dispatch(actions.createWallet(walletList, wType)),
  selectWallet: wallet => dispatch(actions.selectWallet(wallet)),
  fetchWalletInfo: wallet => dispatch(actions.fetchWalletInfo(wallet)),
  checkoutNews: () => dispatch(actions.checkoutNews()),
  fetchFiat: type => dispatch(fiatCurrency(type)),
  getDataForChart: (currency, period, timestamp, fiat) =>
    dispatch(getDataForChart(currency, period, timestamp, fiat)),
  fetchTotalBalance: (type, listOfAddress) =>
    dispatch(actions.fetchTotalBalance(type, listOfAddress)),
  checkoutHistory: () => dispatch(actions.checkoutHistory()),
});

const mapStateToProps = state =>
  // console.log(state.dashboard);
  ({
    chartData: state.wallets.wallet.get('chartData'),
    dappyHistory: state.dashboard.get('dappyHistory'),
    wallets: state.dashboard.get('walletList'),
    selectedWallet: state.dashboard.get('selectedWallet'),
    totalBalance: state.dashboard.get('totalBalance'),
    selectedFiat: state.fiat.get('selectedFiat').toJS(),
    course: state.fiat.get('course'),
    news: state.dashboard.get('news'),
  });

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    props.checkoutWallets();

    this.state = {
      selectedCoin: config.avCurrencyes.get(curNames.BTC).sysName,
      modalContent: null,
      modalOptions: undefined,
    };

    setTimeout(() => {
      if (this.props.wallets && this.props.wallets.size) {
        this.props.fetchFiat(this.state.selectedCoin);
        this.props.fetchTotalBalance(this.props.wallets.toJS(), this.props.course);
      }
    }, 3000);

    setInterval(() => {
      if (this.props.wallets.size) {
        this.props.fetchFiat(this.state.selectedCoin);
        this.props.fetchTotalBalance(this.props.wallets.toJS(), this.props.course);
      }
    }, 300000);
  }

  selectWallet = (wallet) => {
    this.props.fetchWalletInfo(wallet);
    this.props.selectWallet(wallet);
  };

  componentWillUnmount() {
    this.pollInterval = null;
  }

  componentDidMount() {
    this.props.checkoutHistory();
    this.props.checkoutNews();
    this.props.fetchTotalBalance(this.props.wallets.toJS(), this.props.course);
  }

  callModal = (Component, optionalData) => {
    this.setState({ modalContent: Component, modalOptions: optionalData });
  };

  closeModal = () => {
    this.setState({ modalContent: null });
  };

  render() {
    const ModalContent = this.state.modalContent;
    return (
      <Content>
        <Modal>
          {this.state.modalContent ? (
            <ModalContent closeModal={this.closeModal} options={this.state.modalOptions} />
          ) : null}
        </Modal>
        <LeftColumnContainer>
          <SummaryCash
            currencySum={this.props.totalBalance}
            selectedFiat={this.props.selectedFiat}
            course={this.props.course}
            countOfWallets={this.props.wallets}
            callModal={this.callModal}
            closeModal={this.closeModal}
          />
          <News news={this.props.news} />
        </LeftColumnContainer>
        <MiddleColumnContainer>
          {this.props.chartData &&
            wrapedChart(this.props.chartData, this.props.getDataForChart, this.props.selectedFiat)}
          <History dappyHistory={this.props.dappyHistory} />
        </MiddleColumnContainer>
        <RightColumnContainer>
          <ListOfWallets
            callModal={this.callModal}
            closeModal={this.closeModal}
            selectedFiat={this.props.selectedFiat}
            course={this.props.course}
            wallets={this.props.wallets ? this.props.wallets : []}
          />
        </RightColumnContainer>
      </Content>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
