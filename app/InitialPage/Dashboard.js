import React from 'react';
import { connect } from 'react-redux';
import * as actions from './Actions';
import { fiatCurrency, getDataForChart } from '../Wallets/Wallet/Actions';
import { InfoCard } from './InfoCard';
import ListOfWallets from './ListOfWallets';
import wrapedWallet from '../CommonComponents/Chart';
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
  deleteWallet: (walletList, wallet) => dispatch(actions.deleteWallet(walletList, wallet)),
  createWallet: (walletList, wType) => dispatch(actions.createWallet(walletList, wType)),
  selectWallet: wallet => dispatch(actions.selectWallet(wallet)),
  fetchWalletInfo: wallet => dispatch(actions.fetchWalletInfo(wallet)),
  fetchFiat: type => dispatch(fiatCurrency(type)),
  getDataForChart: (currency, period, timestamp, fiat) =>
    dispatch(getDataForChart(currency, period, timestamp, fiat)),
  fetchTotalBalance: (type, listOfAddress) =>
    dispatch(actions.fetchTotalBalance(type, listOfAddress)),
  checkoutHistory: () => dispatch(actions.checkoutHistory()),
});

const mapStateToProps = state => ({
  chartData: state.wallets.wallet.chartData,
  dappyHistory: state.initialPage.dappyHistory,
  wallets: state.initialPage.walletList,
  selectedWallet: state.initialPage.selectedWallet,
  fiat: state.wallets.wallet.fiat,
  totalBalance: state.initialPage.totalBalance,
  selectedFiat: state.fiat.get('selectedFiat').toJS(),
  course: state.fiat.get('course'),
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
      if (this.props.wallets && this.props.wallets.length) {
        this.props.fetchFiat(this.state.selectedCoin);
        this.props.fetchTotalBalance(this.props.wallets, this.props.course);
      }
    }, 3000);

    setInterval(() => {
      if (this.props.wallets.length) {
        this.props.fetchFiat(this.state.selectedCoin);
        this.props.fetchTotalBalance(this.props.wallets, this.props.course);
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
    this.props.fetchTotalBalance(this.props.wallets, this.props.course);
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
          <InfoCard />
        </LeftColumnContainer>
        <MiddleColumnContainer>
          {this.props.chartData &&
            wrapedWallet(this.props.chartData, this.props.getDataForChart, this.props.selectedFiat)}
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
