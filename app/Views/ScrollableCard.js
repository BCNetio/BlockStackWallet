import styled from 'styled-components';
import IconFilter from '../images/common/icon-filter.svg';

export const Scroll = styled.div`
  height: ${props => (props.height ? props.height : 'auto')};
  max-height: 370px;
  overflow-y: scroll;
  overflow-x: hidden;
  background: linear-gradient(180deg, #1f2431 0%, #2b3649 100%);
  background-size: 100% 7px;
  background-repeat: no-repeat;
`;

export const ScrollableItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 20px;
  border-top: 1px solid rgba(141, 150, 178, 0.1);
  border-bottom: 1px solid rgba(141, 150, 178, 0.1);
  position: relative;
  &.transaction-info {
    div:first-child {
      font-size: 12px;
      letter-spacing: 0.25px;
      line-height: 11px;
      display: flex;
      align-items: center;
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      font-size: 12px;
      letter-spacing: 0.3px;
      line-height: 14px;
      text-transform: uppercase;
      margin-left: 20px;
      height: 15px;
      svg {
        margin-right: 5px;
        &.received {
          fill: #7ac231;
          width: 15px;
        }
        &.send {
          fill: #c11e0f;
          width: 15px;
        }
      }
    }
    div:last-child {
      text-align: center;
      position: absolute;
      width: 65px;
      height: 15px;
      bottom: -1px;
      left: 0;
      right: 0;
      margin: auto;
      border: 1px solid #485264;
      border-radius: 5px 5px 0 0;
      display: none;
      svg {
        width: 21px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
  &.wallet-info {
    &:not(:first-child) {
      cursor: pointer;
    }
    div:first-child {
      display: flex;
      align-items: center;
      width: 50%;
      img {
        margin-right: 15px;
      }
      div {
        text-align: left;
        width: 100%;
        p:first-child {
          font-size: 16px;
          letter-spacing: 0.4px;
          color: #fefefe;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding-right: 20px;
        }
      }
    }
    div:last-child {
      text-align: right;
      .title {
        font-size: 12px;
        letter-spacing: 0.3px;
        line-height: 14px;
        margin-bottom: 3px;
        margin-top: 0;
      }
      .subtitle {
        font-size: 10px;
        letter-spacing: 0.25px;
        line-height: 11px;
        color: #8d96b2;
        margin: 0;
        width: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
`;

export const Filter = styled.button`
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 14px;
  text-transform: uppercase;
  height: 15px;
  background: url(${IconFilter});
  background-repeat: no-repeat;
  background-position: center;
  width: 12px
  border: none;
  transform: ${props => props.reverse && 'scale(-1, 1)'}
`;

export const TransactionHover = styled.div`
  &:hover {
    .transaction-info {
      background: rgba(141, 150, 178, 0.1);
      div:last-child {
        display: block;
      }
    }
  }
`;
