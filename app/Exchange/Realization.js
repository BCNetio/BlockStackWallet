import React from 'react';
import { connect } from 'react-redux';
import * as actions from './Actions';
import { has } from 'ramda';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toSatoshi } from '../Providers/Wallets';

import styled, { css } from 'styled-components';

import Loading from '../images/common/icon-exchange-loading.svg'

const Awaiting = styled.div`
  height: 100%;
  padding: 20px;
  p{
    font-size: 12px;
    letter-spacing: 0.225px;
    color: #F1F1F1;
    margin: 0;
    margin-bottom: 10px;
  }
  .awaiting-info{
    position: absolute;
    bottom: 20px;
    width: 100%;
    div{
      display: flex;
      align-items: center;
      p{
        font-size: 10px;
        letter-spacing: 0.1875px;
        color: #F1F1F1;
        margin: 0;
        margin-bottom: 10px;
        &:first-child{
          width: 10%;
        }
        &:last-child{
          width: 85%;
        }
      }
      .order-value{
        color: #7AC231;
      }
      .order-status{
        color: #8D96B2;
      }
    }
  }
`;


class Realization extends React.Component {
   render() {
    this.calculateWillRecive();
    return has('success', this.props.trx) ? (
      <Awaiting className="bg-swap">
        <p>Awaiting Exchange</p>
        <img src={Loading} />
        <div className="awaiting-info">
          <div>
            <p>Order ID</p>
            <p className="order-value">8cf0445533724f</p>
          </div>
          <div>
            <p>Status</p>
            <p className="order-status">Pending</p>
          </div>
        </div>
      </Awaiting>
    ) : (
      <CircularProgress />
    );
  }
}

