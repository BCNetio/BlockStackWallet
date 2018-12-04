import React from "react";
import styled, { css } from "styled-components";
import { v4 } from "uuid";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/KeyboardArrowUp";
import Open from "@material-ui/icons/KeyboardArrowDown";
import { has } from "ramda";
import {
  ScrollableItem,
  TransactionHover,
  StyledButton,
  Input
} from "../../Views";
import IconArrowDown from "../../images/common/icon-arrow-down.svg";

const SelectWrapper = styled.div`
  height: auto;
  background-color: #273041;
  position: relative;
  cursor: pointer;
  &:after {
    content: "";
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
      font-size: 11px;
      letter-spacing: 0.4125px;
      color: #ffffff;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`;

const HistoryWrapper = styled.div`
  max-width: 290px;
  min-width: 100%;
  padding: 20px;
  margin-top: 3px;
  margin-left: 5px;
  border-radius: 2px 0 0 2px;
  background: rgba(141, 150, 178, 0.1);
  > div {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    &:first-child,
    &:last-child {
      div:not(:last-child) {
        margin-right: 30px;
      }
    }
    &:nth-child(3) {
      div {
        width: 50%;
      }
    }
  }
  .title {
    font-size: 8px;
    letter-spacing: 0.2px;
    color: #8d96b2;
    margin-bottom: 5px;
  }
  a {
    font-size: 10px;
    letter-spacing: 0.25px;
    color: #f1f1f1;
    text-decoration: none;
    &.green {
      color: #7ac231;
    }
    &.ellipsis {
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* -------- Transactions ---------------*/

export const TransitionInfo = ({ info, type }) => (
  <HistoryWrapper>
    <div>
      <div>
        <p className="title">Status</p>
        <span>{info.status}</span>
      </div>
      <div>
        <p className="title">Confirmations</p>
        <span>{info.confirmations}</span>
      </div>
    </div>
    <div>
      <div style={{ width: "90%" }}>
        <p className="title">Hash</p>
        <a href={info.hash.href} target="_blank" className="green ellipsis">
          {info.hash.hash}
        </a>
      </div>
    </div>
    <div>
      <div>
        <p className="title">From:</p>
        {info.from.map(sender => (
          <a
            href={sender.href}
            target="_blank"
            className="green ellipsis"
            key={v4()}
          >
            {sender.address}
          </a>
        ))}
      </div>
      <div>
        <p className="title">To:</p>
        {info.to.map(sender => (
          <a
            href={sender.href}
            target="_blank"
            className="green ellipsis"
            key={v4()}
          >
            {sender.address}
          </a>
        ))}
      </div>
    </div>
    {has("gasPrice", info) ? (
      <div>
        <div>
          <p className="title">Gas Price</p>
          {info.gasPrice} Gwei
        </div>
        <div>
          <p className="title">Gas Limit</p>
          {info.gasLimit} Gas
        </div>
      </div>
    ) : (
      <div>
        <div>
          <p className="title">Fee</p>
          {info.fee} {type.toUpperCase()}
        </div>
      </div>
    )}
  </HistoryWrapper>
);

export const TransactionBasicInfo = ({
  trx,
  index,
  openedTrx,
  openTrxInfo,
  type
}) => (
  <TransactionHover>
    <ScrollableItem key={v4()} className="transaction-info">
      <div>{trx.time}</div>
      <div>
        {trx.type === "received" ? (
          <AddIcon className="received" />
        ) : (
          <RemoveIcon className="send" />
        )}
        {trx ? parseFloat(trx.value).toFixed(5) : 0} {type.toUpperCase()}
      </div>
      {index === openedTrx ? (
        <div>
          <Close onClick={() => openTrxInfo(true)} />
        </div>
      ) : (
        <div>
          <Open onClick={() => openTrxInfo(index)} />
        </div>
      )}
    </ScrollableItem>
    {index === openedTrx && (
      <TransitionInfo key={v4()} info={trx.info} type={type} />
    )}
  </TransactionHover>
);
