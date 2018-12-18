import React from "react";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import { has, head } from "ramda";
import * as actions from "./Actions";
import { toSatoshi, toETH } from "../Providers/Wallets";

// Import components
import Select from "../CommonComponents/Select";
import {
  Input,
  Label,
  Tooltip,
  NextButtonWrapper,
  Next,
  SelectWrapper,
  Tabs,
  Row,
  DoubleInputSelectWrapper }
from "./CommonComponents/Index";

// Component
class StartExchange extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.wallets.length && !has("wid", prevState.walletFrom)) {
      const walletFrom = head(nextProps.wallets);
      const walletTo = nextProps.wallets.filter(
        wallet => wallet.type !== head(walletFrom.type)
      );
      nextProps.fetchMarketInfo(`${walletFrom.type}_${walletTo.type}`);
      nextProps.fetchWalletBalance(walletFrom.type, walletFrom.address);
      return {
        walletFrom,
        walletTo
      };
    }
    return prevState;
  }

  state = {
    walletTo: {},
    walletFrom: {},
    amount: 0,
    valid: false,
    error: ""
  };

  componentDidMount() {
    this.props.fetchWallets();
  }

  fetchMarketInfo = pair => {
    this.props.fetchMarketInfo(pair);
  };

  filterWallets = currency =>
    this.props.wallets.filter(wallet => wallet.type !== currency);

  onChangeAmount = e => {
    this.setState({ amount: e.target.value });
    this.validation(e.target.value);
  };

  validation = value => {
    const convertedValue = Number(value);
    const { balance, marketInfo, fee, gas } = this.props;
    const checkComission = value =>
      !this.state.walletFrom.type.includes("et")
        ? toSatoshi(balance) - fee - toSatoshi(value) > 0
          ? { valid: true, error: "" }
          : {
              valid: false,
              error: "Wrong amount(fee)"
            }
        : balance - value - toETH(gas * 21000) > 0
        ? { valid: true, error: "" }
        : {
            valid: false,
            error: "Wrong amount(gas)"
          };

    const validators = [
      value => checkComission(value),
      value =>
        value > marketInfo.minimum
          ? { valid: true, error: "" }
          : {
              valid: false,
              error: `The value must not be less than minimal ${
                marketInfo.minimum
              }`
            },
      value =>
        value < marketInfo.limit
          ? { valid: true, error: "" }
          : {
              valid: false,
              error: `The value must be less ${marketInfo.limit}`
            },
      value =>
        value <= balance
          ? { valid: true, error: "" }
          : {
              valid: false,
              error: "Wrong amount"
            },
      value =>
        balance - value > 0
          ? { valid: true, error: "" }
          : {
              valid: false,
              error: "Wrong amount"
            }
    ];
    const result = validators
      .map(validator => validator(convertedValue))
      .find(result => result.valid !== true);
    result === undefined
      ? this.setState({ valid: true, error: "" })
      : this.setState({
          valid: false,
          error: result.error
        });
  };

  amoutExchangeRate = amount =>
    (
      amount * this.props.marketInfo.rate -
      this.props.marketInfo.minerFee
    ).toFixed(6);

  toStepTwo = () => {
    this.props.mountExchangeDetails({
      walletFrom: this.state.walletFrom,
      walletTo: this.state.walletTo,
      amount: this.state.amount,
      willRecive: this.amoutExchangeRate(this.state.amount)
    });

    this.props.fetchStatusExchange({
      withdrawal: this.state.walletTo.address,
      pair: `${this.state.walletFrom.type}_${this.state.walletTo.type}`,
      returnAddress: this.state.walletFrom.address,
      depositAmount: this.state.amount
    });
    this.props.mountActiveTab(1);
  };

  handleMenuItemClick = walletFrom => {
    this.setState({ walletFrom });
    this.props.fetchWalletBalance(walletFrom.type, walletFrom.address);
    this.props.fetchMarketInfo(
      `${walletFrom.type}_${this.filterWallets(walletFrom.type)[0].type}`
    );
    this.setState({ walletTo: head(this.filterWallets(walletFrom.type)) });
  };

  handleMenuItemClickTo = walletTo => {
    this.setState({ walletTo });
    this.props.fetchMarketInfo(
      `${this.state.walletFrom.type}_${walletTo.type}`
    );
  };

  render() {
    return this.props.wallets.length ? (
      <div>
        <Row>
          <Label>From</Label>
          <DoubleInputSelectWrapper>
            <Input onChange={this.onChangeAmount} value={this.state.amount} />
            <SelectWrapper className="arrow-down">
              <Select
                selectItem={this.state.walletFrom}
                list={this.props.wallets}
                config={{ search: true, input: false, type: "transactions" }}
                handleMenuItemClick={this.handleMenuItemClick}
              />
            </SelectWrapper>
          </DoubleInputSelectWrapper>
        </Row>
        <Tooltip className="error">{this.state.error}</Tooltip>
        <Tooltip>Aviable amount: {this.props.balance}</Tooltip>
        <Row mt20>
          <Label>To</Label>
          <DoubleInputSelectWrapper>
            <Input
              value={
                this.state.amount
                  ? this.amoutExchangeRate(this.state.amount)
                  : 0
              }
              disabled
            />
            <SelectWrapper className="arrow-down">
              <Select
                selectItem={this.state.walletTo}
                list={this.filterWallets(this.state.walletFrom.type)}
                config={{ search: true, input: false, type: "transactions" }}
                handleMenuItemClick={this.handleMenuItemClickTo}
              />
            </SelectWrapper>
          </DoubleInputSelectWrapper>
        </Row>
        <NextButtonWrapper>
          <Next
            variant="outlined"
            onClick={() => this.toStepTwo(1)}
            disabled={!this.state.valid}
          >
            Next
          </Next>
        </NextButtonWrapper>
        {has("limit", this.props.marketInfo) && (
          <Tabs>
            <div>
              <p>Deposit min</p>
              <span>
                {this.props.marketInfo.minimum}{" "}
                {this.state.walletFrom.type.toUpperCase()}
              </span>
            </div>
            <div>
              <p>Deposit Max</p>
              <span>
                {this.props.marketInfo.maxLimit}{" "}
                {this.state.walletFrom.type.toUpperCase()}
              </span>
            </div>
            <div>
              <p>Miner Fee</p>
              <span>
                {this.props.marketInfo.minerFee}{" "}
                {this.state.walletTo.type.toUpperCase()}
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
  gas: state.fiat.gas
});

const mapDispatchToProps = dispatch => ({
  fetchWallets: () => dispatch(actions.fetchWallets()),
  fetchWalletBalance: (type, address) =>
    dispatch(actions.fetchWalletBalance(type, address)),
  fetchMarketInfo: pair => dispatch(actions.fetchMarketInfo(pair)),
  mountActiveTab: tabId => dispatch(actions.mountActiveTab(tabId)),
  mountExchangeDetails: details =>
    dispatch(actions.mountExchangeDetails(details)),
  fetchStatusExchange: params => dispatch(actions.fetchStatusExchange(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartExchange);
