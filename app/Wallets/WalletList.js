import React from "react";
import { connect } from "react-redux";
import { filter } from "ramda";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import * as actions from "./WalletList/Actions";
import Modal from "../CommonComponents/Modal";
import { SEND } from "./WalletList/RenderFunctions";


// Import components
import { InputSearch, Content } from "../Views";
import { WalletsControl, Filter, Switcher } from "./WalletList/ControlPanel";
import { AvaliableWallets } from "./WalletList/Views";

// Styled
const WalletsListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  width: 100%;
`
// Component
const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList,
  selectedWalletInfo: state.wallets.walletList.selectedWalletInfo,
  course: state.fiat.course,
  selectedFiat: state.fiat.selectedFiat
});

const mapDispatchToProps = dispatch => ({
  checkoutWallets: () => dispatch(actions.checkoutWalletList())
});

class WalletList extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return props.wallets.length && !state.walletList.length
      ? { ...state, walletList: props.wallets }
      : state;
  }

  constructor(props) {
    super(props);
    this.state = {
      sendReceiveSelector: SEND,
      selectedWallet: null,
      modalContent: null,
      modalOptions: undefined,
      showZeroBalanced: true,
      searchPattern: "",
      walletList: props.wallets,
      separate: false
    };
  }

  componentDidMount() {
    this.props.checkoutWallets();
  }

  splitWallets = _ =>
    this.setState({
      separate: !this.state.separate,
      walletList: !this.state.separate
        ? this.rebuildWallets()
        : this.props.wallets
    });

  rebuildWallets = () =>
    this.state.walletList.reduce((acc, cur) => {
      if (cur.tokens) {
        return [
          ...acc,
          cur,
          ...cur.tokens.tokenList.map(t => ({
            ...cur,
            balance: {
              ...cur.balance,
              value: t.balance / 10 ** t.tokenInfo.decimals
            },
            type: t.tokenInfo.symbol,
            originAddress: cur.address,
            token: t,
            tokens: undefined
          }))
        ];
      }
      return [...acc, cur];
    }, []);

  handleSearch = e => {
    this.setState({
      walletList: this.filterWallets(e.currentTarget.value),
      searchPattern: e.currentTarget.value
    });
  };

  handleShowZeroBalanced = () => {
    this.setState(({ showZeroBalanced }) => ({
      showZeroBalanced: !showZeroBalanced
    }));
  };

  hideZeroBalanced = (acc, curr) => {
    if (this.state.showZeroBalanced) {
      return [...acc, curr];
    }
    return curr.balance && curr.balance.value ? [...acc, curr] : acc;
  };

  filterWallets = searchPattern => {
    const filterFunc = wallet =>
      wallet.alias.toUpperCase().includes(searchPattern.toUpperCase()) ||
      wallet.address.toUpperCase().includes(searchPattern.toUpperCase());
    return filter(filterFunc, this.props.wallets);
  };

  selectWallet = wallet => {
    localStorage.setItem("selectWallet", wallet.wid);
    this.props.history.push({
      pathname: `/wallet/${wallet.wid}`,
      state: wallet
    });
  };

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
            <ModalContent
              closeModal={this.closeModal}
              options={this.state.modalOptions}
            />
          ) : null}
        </Modal>
        <WalletsListWrapper>
          <WalletsControl>
            <InputSearch walletListSearch
              value={this.state.searchPattern}
              onChange={this.handleSearch}
              type="text"
              placeholder="Search…"
            />
            <Filter>
              <label>
                <input
                  className="checkbox"
                  value={this.state.showZeroBalanced}
                  onChange={this.handleShowZeroBalanced}
                  type="checkbox"
                  name="wallets-filter"
                />
                <span className="checkbox-custom header" />
                <span
                  className="label"
                  style={{ fontSize: "12px", lineHeight: "14px" }}
                >
                  Hide zero balance
                </span>
              </label>
            </Filter>
            <Switcher>
              <label className="switch">
                <input
                  type="checkbox"
                  id="switch"
                  value={this.state.separate}
                  onClick={this.splitWallets}
                />
                <span className="slider round" />
              </label>
              <label className="text" htmlFor="switch">
                Use a separate wallet for each token
              </label>
            </Switcher>
          </WalletsControl>
          <AvaliableWallets
            closeModal={this.closeModal}
            walletList={this.state.walletList.reduce(this.hideZeroBalanced, [])}
            callModal={this.callModal}
            select={this.selectWallet}
            course={this.props.course}
            selectedFiat={this.props.selectedFiat}
          />
        </WalletsListWrapper>
      </Content>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WalletList)
);
