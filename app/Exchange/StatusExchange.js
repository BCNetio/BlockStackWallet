import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled, { css } from 'styled-components';

import * as actions from './Actions';

const Dots = styled.span``;

const waitingSucces = () => {
  <div>
    <div>Awaiting exchange</div>
    <CircularProgress />
  </div>;
};

const Awaiting = styled.div`
  height: 310px;
  position: relative;
  padding: 20px;
  p {
    font-size: 12px;
    letter-spacing: 0.225px;
    color: #f1f1f1;
  }
  .result {
    p {
      &:first-child {
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.225px;
        color: #f1f1f1;
        span {
          color: #8d96b2;
        }
      }
      &:last-child {
        font-size: 18px;
        letter-spacing: 0.3375px;
        color: #7ac231;
        margin: 0;
      }
    }
  }
  .loading:after {
    left: 0;
  }
  .awaiting-info {
    position: absolute;
    bottom: 20px;
    width: 100%;
    div {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      p {
        font-size: 10px;
        letter-spacing: 0.1875px;
        color: #f1f1f1;
        &:first-child {
          width: 12%;
        }
        &:last-child {
          width: 80%;
        }
      }
      .order-value {
        font-size: 10px;
        letter-spacing: 0.1875px;
        color: #7ac231;
      }
      .order-status {
        color: #8d96b2;
      }
    }
  }
`;

class StatusExchange extends React.Component {
  render() {
    return (
      <Awaiting className="bg-swap">
        {this.props.statusDeposit === 'Pending' && (
          <div>
            <p style={{ marginBottom: '10px' }}>Awaiting Exchange</p>
            <Dots className="loading" />
          </div>
        )}
        {this.props.statusDeposit === 'Finished' && (
          <div className="result">
            <p>
              Congratulations! You just exchange<br />
              <span>
                {this.props.exchangeDetails.amount}{' '}
                {this.props.exchangeDetails.walletFrom.type.toUpperCase()}
              </span>{' '}
              to
            </p>
            <p>
              {(this.props.exchangeDetails.amount - this.props.marketInfo.minimum) *
                this.props.marketInfo.rate}
              {this.props.exchangeDetails.walletTo.type.toUpperCase()}
            </p>
          </div>
        )}
        <div className="awaiting-info">
          <div>
            <p>Order ID</p>
            <a
              className="order-value"
              href={`https://shapeshift.io/#/status/${this.props.trx.orderId}`}
              target="_blank"
            >
              {this.props.trx.orderId}
            </a>
          </div>
          <div>
            <p>Status</p>
            <p className="order-status">{this.props.statusDeposit}</p>
          </div>
        </div>
      </Awaiting>
    );
  }
}

const mapStateToProps = state => ({
  marketInfo: state.exchange.marketInfo,
  exchangeDetails: state.exchange.exchangeDetails,
  trx: state.exchange.trx,
  statusDeposit: state.exchange.statusDeposit,
});

const mapDispatchToProps = dispatch => ({
  mountActiveTab: tabId => dispatch(actions.mountActiveTab(tabId)),
  makeTransaction: (wallet, receivers) => dispatch(actions.makeTransaction(wallet, receivers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusExchange);
