import React from 'react';
import { connect } from 'react-redux';
import * as actions from './Actions';
import { has } from 'ramda';
import { BackButton } from '../Views';
import { makeTransaction } from '../Wallets/Wallet/Actions';
import styled, { css } from 'styled-components';

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

const Confirm = styled.div`
  .content {
    background-color: #343f53;
    padding-bottom: 20px;
  }
  .awaiting-info {
    position: absolute;
    bottom: 20px;
    width: 92%;
    display: flex;
    justify-content: space-between;
  }
  .title-wrapper {
    padding: 20px 0;
    border-bottom: 1px dashed #2b3649;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: -9px;
      left: 0;
      width: 7px;
      height: 14px;
      border: 2px solid transparent;
      border-radius: 0 100% 100% 0 / 0 50% 50% 0;
      background: #2b3649;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: -9px;
      right: 0;
      width: 7px;
      height: 14px;
      border: 2px solid transparent;
      border-radius: 100% 0 0 100% / 50% 0 0 50%;
      background: #2b3649;
    }
    p {
      color: #f1f1f1;
      font-size: 12px;
      letter-spacing: 0.23px;
      line-height: 14px;
      padding-left: 24px;
      margin: 0;
      span {
        color: #7ac231;
        font-size: 14px;
        letter-spacing: 0.26px;
        line-height: 16px;
        text-transform: uppercase;
        margin-left: 5px;
      }
    }
  }
  .purpose-wrapper {
    display: flex;
    justify-content: flex-start;
    padding-left: 24px;
    &:nth-child(2) {
      padding-top: 20px;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  .purpose {
    color: #8d96b2;
    font-size: 10px;
    letter-spacing: 0.19px;
    line-height: 11px;
    width: 20%;
    + div {
      color: #f1f1f1;
      font-size: 10px;
      letter-spacing: 0.19px;
      line-height: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 70%;
    }
  }
`;

const Button = styled.button`
  border: 1px solid #7ed321;
  border-radius: 14px;
  background: transparent;
  color: #8d96b2;
  padding: 5px 20px;
  cursor: pointer;
  margin-right: 5px;
  outline: none;
`;

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fee: props.fee, gasPrice: props.gas, gasLimit: '21000' };
  }

  toStepThree = () => {
    const { trx, exchangeDetails, balance, marketInfo } = this.props;
    this.props.mountActiveTab(2);
    this.props.fetchStatusDeposit(trx.deposit);
    console.log(exchangeDetails.walletFrom);
    this.props.makeTransaction(
      exchangeDetails.walletFrom,
      [
        {
          key: trx.deposit,
          amount: exchangeDetails.amount,
        },
      ],
      this.state,
    );
  };

  render() {
    console.log(this.state);
    const { exchangeDetails, marketInfo } = this.props;
    return (
      <Confirm>
        <div className="content">
          <div className="title-wrapper">
            <p>
              Are your sure want to exchange
              <span>
                {exchangeDetails.amount} {exchangeDetails.walletFrom.type}?
              </span>
            </p>
          </div>
          <div className="purpose-wrapper">
            <div className="purpose">From</div>
            <div>{exchangeDetails.walletFrom.address}</div>
          </div>
          <div className="purpose-wrapper">
            <div className="purpose">To</div>
            <div>{exchangeDetails.walletTo.address}</div>
          </div>
          <div className="purpose-wrapper">
            <div className="purpose">Fee</div>
            <div>
              {marketInfo.minerFee} {exchangeDetails.walletTo.type.toUpperCase()}
            </div>
          </div>
          <div className="purpose-wrapper">
            <div className="purpose">Will receive</div>
            <div>
              {exchangeDetails.willRecive} {exchangeDetails.walletTo.type.toUpperCase()}
            </div>
          </div>
        </div>
        <Tooltip className="error">{this.props.shapeShiftError}</Tooltip>
        <div className="awaiting-info">
          <BackButton variant="outlined" onClick={() => this.props.mountActiveTab(0)}>
            Back
          </BackButton>
          <Button
            variant="outlined"
            onClick={() => this.toStepThree()}
            disabled={!has('deposit', this.props.trx)}
          >
            {has('deposit', this.props.trx) ? <span>Confirm</span> : <span className="loading" />}
          </Button>
        </div>
      </Confirm>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.exchange.balanceDeposit,
  marketInfo: state.exchange.marketInfo,
  exchangeDetails: state.exchange.exchangeDetails,
  trx: state.exchange.trx,
  shapeShiftError: state.exchange.shapeShiftError,
  fee: state.fiat.fee,
  gas: state.fiat.gas,
});

const mapDispatchToProps = dispatch => ({
  mountActiveTab: tabId => dispatch(actions.mountActiveTab(tabId)),
  makeTransaction: (wallet, receivers, options) =>
    dispatch(makeTransaction(wallet, receivers, options)),
  fetchStatusDeposit: address => dispatch(actions.fetchStatusDeposit(address)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
