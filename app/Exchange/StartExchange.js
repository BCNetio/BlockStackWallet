import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { has } from 'ramda';
import { logos } from '../images';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import * as actions from './Actions';
import Select from '../CommonComponents/Select';
import styled, { css } from 'styled-components';
import IconArrowDown from '../images/common/icon-arrow-down.svg';
import { toSatoshi, toETH } from '../Providers/Wallets';
import { v4 } from 'uuid';

const Input = styled.input`
  border-radius: 2px 0 0 2px;
  background-color: #1f2431;
  border: none;
  height: auto;
  padding-left: 20px;
  color: #fff;
  width: 194px;
`;

const Label = styled.p`
  font-size: 11px;
  letter-spacing: 0.41px;
  line-height: 13px;
`;

const Tooltip = styled.span`
  color: #8d96b2;
  font-size: 8px;
  letter-spacing: 0.2px;
  line-height: 9px;
  margin-left: 61px;
  &.error {
    color: red;
    display: block;
    margin-top: 10px;
  }
`;

const Next = styled.button`
  border: 1px solid #8d96b2;
  border-radius: 14px;
  background: transparent;
  color: #8d96b2;
  padding: 5px 20px;
  cursor: pointer;
  margin-right: 5px;
  outline: none;
`;

const SelectWrapper = styled.div`
  height: auto;
  background-color: #273041;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    display: block;
    height: 9px;
    width: 6px;
    position: absolute;
    right: 10px;
    top: 42%;
    background: url(${IconArrowDown}) no-repeat;
    transform: rotate(-90deg) translateY(-50%);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  > div {
    padding: 8px 10px;
    width: 156px;
    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 11px;
      letter-spacing: 0.4125px;
      color: #ffffff;
      div {
        width: 20%;
        height: 20px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-right: 20px;
        width: 80%;
      }
    }
  }
`;

const Tabs = styled.div`
  border-top: 1px solid rgba(141, 150, 178, 0.1);
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: -20px;
  position: absolute;
  bottom: 0;
  div {
    width: 33.9%;
    text-align: center;
    padding: 15px 0;
    &:not(:last-child) {
      border-right: 1px solid rgba(141, 150, 178, 0.1);
    }
    p {
      color: #8d96b2;
      font-size: 10px;
      letter-spacing: 0.25px;
      line-height: 11px;
      margin-bottom: 4px;
    }
    span {
      color: #f1f1f1;
      font-size: 10px;
      letter-spacing: 0.25px;
      line-height: 11px;
      text-transform: uppercase;
    }
  }
`;

class StartExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletTo: {},
      walletFrom: {},
      amount: 0,
      valid: false,
      error: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.wallets.length && !has('wid', prevState.walletFrom)) {
      const walletFrom = nextProps.wallets[0];
      const walletTo = nextProps.wallets.filter(wallet => wallet.type !== walletFrom.type)[0];
      nextProps.fetchMarketInfo(`${walletFrom.type}_${walletTo.type}`);
      nextProps.fetchWalletBalance(walletFrom.type, walletFrom.address);
      return {
        walletFrom,
        walletTo,
      };
    }
    return prevState;
  }

  componentDidMount() {
    this.props.fetchWallets();
  }

  fetchMarketInfo = (pair) => {
    this.props.fetchMarketInfo(pair);
  };

  filterWallets = currency => this.props.wallets.filter(wallet => wallet.type !== currency);

  onChangeAmount = (e) => {
    this.setState({ amount: e.target.value });
    this.validation(e.target.value);
  };

  validation = (value) => {
    const convertedValue = Number(value);
    const { balance, marketInfo, fee, gas } = this.props;

    console.log(toETH(gas * 21));

    const checkComission = value =>
      !this.state.walletFrom.type.includes('et')
        ? toSatoshi(balance) - fee - toSatoshi(value) > 0
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: 'Wrong amount(fee)',
          }
        : balance - value - toETH(gas * 21000) > 0
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: 'Wrong amount(gas)',
          };

    const validators = [
      value => checkComission(value),
      value =>
        value > marketInfo.minimum
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: `The value dont must be smaller than minimal ${marketInfo.minimum}`,
          },
      value =>
        value < marketInfo.limit
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: `The value must be less ${marketInfo.limit}`,
          },
      value =>
        value <= balance
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: 'Wrong amount',
          },
      value =>
        balance - value > 0
          ? { valid: true, error: '' }
          : {
            valid: false,
            error: 'Wrong amount',
          },
    ];
    const result = validators
      .map(validator => validator(convertedValue))
      .find(result => result.valid !== true);
    result === undefined
      ? this.setState({ valid: true, error: '' })
      : this.setState({
        valid: false,
        error: result.error,
      });
    console.log(result);
  };

  amoutExchangeRate = amount =>
    (amount * this.props.marketInfo.rate - this.props.marketInfo.minerFee).toFixed(6);

  toStepTwo = () => {
    this.props.mountExchangeDetails({
      walletFrom: this.state.walletFrom,
      walletTo: this.state.walletTo,
      amount: this.state.amount,
      willRecive: this.amoutExchangeRate(this.state.amount),
    });

    this.props.fetchStatusExchange({
      withdrawal: this.state.walletTo.address,
      pair: `${this.state.walletFrom.type}_${this.state.walletTo.type}`,
      returnAddress: this.state.walletFrom.address,
      depositAmount: this.state.amount,
      // amount: this.amoutExchangeRate(this.state.amount),
    });
    this.props.mountActiveTab(1);
  };

  handleMenuItemClick = (walletFrom) => {
    this.setState({ walletFrom });
    this.props.fetchWalletBalance(walletFrom.type, walletFrom.address);
    this.props.fetchMarketInfo(`${walletFrom.type}_${this.filterWallets(walletFrom.type)[0].type}`);
    this.setState({ walletTo: this.filterWallets(walletFrom.type)[0] });
  };

  handleMenuItemClickTo = (walletTo, index) => {
    this.setState({ walletTo });
    this.props.fetchMarketInfo(`${this.state.walletFrom.type}_${walletTo.type}`);
  };

  render() {
    return this.props.wallets.length ? (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Label>From</Label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <Input onChange={this.onChangeAmount} value={this.state.amount} />
            <SelectWrapper className="arrow-down">
              <Select
                selectItem={this.state.walletFrom}
                list={this.props.wallets}
                config={{ search: true, input: false, type: 'transactions' }}
                handleMenuItemClick={this.handleMenuItemClick}
              />
            </SelectWrapper>
          </div>
        </div>
        <Tooltip className="error">{this.state.error}</Tooltip>
        <Tooltip>Aviable amount: {this.props.balance}</Tooltip>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Label>To</Label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'stretch' }}>
            <Input
              value={this.state.amount ? this.amoutExchangeRate(this.state.amount) : 0}
              disabled
            />
            <SelectWrapper className="arrow-down">
              <Select
                selectItem={this.state.walletTo}
                list={this.filterWallets(this.state.walletFrom.type)}
                config={{ search: true, input: false, type: 'transactions' }}
                handleMenuItemClick={this.handleMenuItemClickTo}
              />
            </SelectWrapper>
          </div>
        </div>
        <div style={{ marginTop: '35px', textAlign: 'right' }}>
          <Next variant="outlined" onClick={() => this.toStepTwo(1)} disabled={!this.state.valid}>
            Next
          </Next>
        </div>
        {has('limit', this.props.marketInfo) && (
          <Tabs>
            <div>
              <p>Deposit min</p>
              <span>
                {this.props.marketInfo.minimum} {this.state.walletFrom.type.toUpperCase()}
              </span>
            </div>
            <div>
              <p>Deposit Max</p>
              <span>
                {this.props.marketInfo.maxLimit} {this.state.walletFrom.type.toUpperCase()}
              </span>
            </div>
            <div>
              <p>Miner Fee</p>
              <span>
                {this.props.marketInfo.minerFee} {this.state.walletTo.type.toUpperCase()}
              </span>
            </div>
          </Tabs>
        )}
      </div>
    ) : (
      <CircularProgress />
    );
  }
}

const mapStateToProps = state => ({
  balance: state.exchange.balanceDeposit,
  wallets: state.exchange.wallets,
  marketInfo: state.exchange.marketInfo,
  fee: state.fiat.fee,
  gas: state.fiat.gas,
});

const mapDispatchToProps = dispatch => ({
  fetchWallets: () => dispatch(actions.fetchWallets()),
  fetchWalletBalance: (type, address) => dispatch(actions.fetchWalletBalance(type, address)),
  fetchMarketInfo: pair => dispatch(actions.fetchMarketInfo(pair)),
  mountActiveTab: tabId => dispatch(actions.mountActiveTab(tabId)),
  mountExchangeDetails: details => dispatch(actions.mountExchangeDetails(details)),
  fetchStatusExchange: params => dispatch(actions.fetchStatusExchange(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartExchange);
