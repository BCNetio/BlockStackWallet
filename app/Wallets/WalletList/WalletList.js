import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'ramda';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import * as actions from './Actions';
import Modal from '../../CommonComponents/Modal';
import { SEND } from './RenderFunctions';
import IconSupport from '../../images/common/icon-support.svg';
import IconArrowDown from '../../images/common/icon-arrow-down.svg';
import { AvaliableWallets } from './Views';
import { InputSearch, Content } from '../../Views';

const HeaderControl = styled.div`
  width: 85%;
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 70%;
    display: flex;
    align-items: center;
  }
  .right {
    width: 30%;
    text-align: right;
  }
  .switch-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    .text {
      font-size: 12px;
      margin-left: 10px;
      cursor: pointer;
    }
    label {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .support {
    margin-left: 50px;
    a {
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.3px;
      position: relative;
      color: #fff;
      text-decoration: none;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -30px;
        width: 16px;
        height: 13px;
        transform: translateY(-50%);
        background: url(${IconSupport}) no-repeat;
      }
    }
  }
  .dropdawn-fiat-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
      width: 14px;
      height: 14px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        object-fit: cover;
        width: 100%;
      }
    }
    span {
      position: relative;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -20px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
    }
  }
  .dropdawn-wallet-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
      position: relative;
      display: flex;
      align-items: center;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -20px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
      img {
        width: 36px;
        height: 36px;
        margin-left: 15px;
      }
      span {
        font-size: 16px;
        text-align: right;
        letter-spacing: 0.4px;
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
  color: #fff;
`;

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList,
  selectedWalletInfo: state.wallets.walletList.selectedWalletInfo,
  course: state.fiat.get('course'),
  selectedFiat: state.fiat.get('selectedFiat').toJS(),
});

const mapDispatchToProps = dispatch => ({
  checkoutWallets: () => dispatch(actions.checkoutWalletList()),
});

class WalletList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendReceiveSelector: SEND,
      selectedWallet: null,
      modalContent: null,
      modalOptions: undefined,
      showZeroBalanced: true,
      searchPattern: '',
      walletList: props.wallets,
      separate: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return props.wallets.length !== state.walletList.length
      ? { ...state, walletList: props.wallets }
      : state;
  }

  componentDidMount() {
    this.props.checkoutWallets();
  }

  splitWallets = _ =>
    this.setState({
      separate: !this.state.separate,
      walletList: !this.state.separate ? this.rebuildWallets() : this.props.wallets,
    });

  rebuildWallets = () =>
    this.state.walletList.reduce((acc, cur) => {
      if (cur.tokens) {
        return [
          ...acc,
          cur,
          ...cur.tokens.tokenList.map(t => ({
            ...cur,
            balance: { ...cur.balance, value: t.balance / 10 ** t.tokenInfo.decimals },
            type: t.tokenInfo.symbol,
            originAddress: cur.address,
            token: t,
            tokens: undefined,
          })),
        ];
      }
      return [...acc, cur];
    }, []);

  handleSearch = (e) => {
    this.setState({
      walletList: this.filterWallets(e.currentTarget.value),
      searchPattern: e.currentTarget.value,
    });
  };

  hideZeroBalanced = (acc, curr) => {
    if (this.state.showZeroBalanced) {
      return [...acc, curr];
    }
    return curr.balance && curr.balance.value ? [...acc, curr] : acc;
  };

  filterWallets = (searchPattern) => {
    const filterFunc = wallet =>
      wallet.alias.toUpperCase().includes(searchPattern.toUpperCase()) ||
      wallet.address.toUpperCase().includes(searchPattern.toUpperCase());
    return filter(filterFunc, this.props.wallets);
  };

  selectWallet = (wallet) => {
    localStorage.setItem('selectWallet', wallet.wid);
    this.props.history.push({
      pathname: `/wallet/${wallet.wid}`,
      state: wallet,
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
            <ModalContent closeModal={this.closeModal} options={this.state.modalOptions} />
          ) : null}
        </Modal>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <HeaderWrapper>
            <HeaderControl style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <InputSearch
                value={this.state.searchPattern}
                onChange={this.handleSearch}
                type="text"
                placeholder="Search…"
              />
              <div style={{ marginLeft: '15px' }}>
                <label>
                  <input
                    className="checkbox"
                    value={this.state.showZeroBalanced}
                    onChange={this.handleShowZeroBalanced}
                    type="checkbox"
                    name="wallets-filter"
                  />
                  <span className="checkbox-custom header" />
                  <span className="label" style={{ fontSize: '12px', lineHeight: '14px' }}>
                    Hide zero balance
                  </span>
                </label>
              </div>
              <div className="switch-wrapper">
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
              </div>
            </HeaderControl>
          </HeaderWrapper>
          <AvaliableWallets
            closeModal={this.closeModal}
            walletList={this.state.walletList.reduce(this.hideZeroBalanced, [])}
            callModal={this.callModal}
            select={this.selectWallet}
            course={this.props.course}
            selectedFiat={this.props.selectedFiat}
          />
        </div>
      </Content>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WalletList),
);
