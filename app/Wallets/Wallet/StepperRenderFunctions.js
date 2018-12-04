import React from "react";
import styled from "styled-components";
import { BackButton, Input } from "../../Views";
import Select from "../../CommonComponents/Select";
import IconArrowDown from "../../images/common/icon-arrow-down.svg";
import IconScale from "../../images/common/icon-scale.svg";
import config from "../../Providers/config";
import { curNames } from "../../AppConfig";

const Dots = styled.span``;

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

const Awaiting = styled.div`
  padding: 20px;
  p {
    font-size: 12px;
    letter-spacing: 0.225px;
    color: #f1f1f1;
    margin: 0;
    margin-bottom: 10px;
  }
  .result {
    p {
      &:first-child {
        font-size: 12px;
        line-height: 19px;
        letter-spacing: 0.225px;
        color: #f1f1f1;
        margin: 0;
        margin-bottom: 10px;
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
      p {
        font-size: 10px;
        letter-spacing: 0.1875px;
        color: #f1f1f1;
        margin: 0;
        margin-bottom: 10px;
        &:first-child {
          width: 10%;
        }
        &:last-child {
          width: 85%;
        }
      }
      .order-value {
        color: #7ac231;
      }
      .order-status {
        color: #8d96b2;
      }
    }
  }
`;

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
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 20px;
    }
  }
`;

const Confirm = styled.div`
  padding: 25px 20px;
  .content {
    background-color: #343f53;
    padding-bottom: 20px;
  }
  .awaiting-info {
    position: absolute;
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  .confirm-block {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
  .title-wrapper {
    padding: 20px 0;
    border-bottom: 1px dashed #2b3649;
    position: relative;
    &:after {
      content: "";
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
      content: "";
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

const Tooltip = styled.span`
  color: #8d96b2;
  font-size: 8px;
  letter-spacing: 0.2px;
  line-height: 9px;
  margin-left: 15%;
  display: block;
  padding: 5px;
  &.error {
    color: red;
  }
`;

const FundsInfo = styled.div`
  padding: 25px 20px 20px;
  .wrapper {
    display: flex;
    align-items: center;
    span {
      width: 15%;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 85%;
      input {
        width: 35%;
      }
      span {
        width: 10%;
      }
    }
    .arrow-down {
      width: 100%;
      > div {
        width: 100%;
      }
      input {
        width: 100%;
      }
    }
  }
`;

const Hidden = styled.div`
  padding: 0 20px;
  .wrapper {
    display: flex;
    align-items: center;
    margin-top: 16px;
    span {
      width: 15%;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 85%;
      input {
        width: 35%;
      }
    }
  }
`;

const OpenOptions = styled.span`
  margin-top: 15px;
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.25px;
  color: #7ac231;
  margin-left: 18%;
  background: url(${IconScale}) no-repeat 0% center;
  padding-left: 25px;
  cursor: pointer;
`;

export const SenderBlock = ({
  wallet,
  amount,
  change,
  wallets,
  handleReciver,
  receiver,
  valid,
  error,
  balance,
  rop,
  changeROP
}) => (
  <FundsInfo>
    <div className="wrapper">
      <span>From</span>
      <div>
        <Input value={wallet.alias ? wallet.alias : wallet.address} disabled />
        <span>Amount</span>
        <div style={{ width: "35%", position: "relative" }}>
          <Input
            onChange={change}
            value={amount}
            placeholder={"amount to be sent"}
            style={{ width: "100%", paddingRight: "40px" }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              width: "auto",
              fontSize: "12px",
              letterSpacing: "0.3px",
              color: "#8D96B2"
            }}
          >
            {wallet.type.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
    <Tooltip>Available amount: {balance}</Tooltip>
    <Tooltip className="error">{error}</Tooltip>
    {wallet.readOnly && (
      <div className="wrapper">
        <span>Private key</span>
        <Input
          onChange={changeROP}
          value={rop}
          placeholder={"Please enter private key."}
          style={{ width: "85%", marginBottom: "3px" }}
        />
      </div>
    )}
    <div className="wrapper">
      <span>Send to</span>
      <div>
        <SelectWrapper
          className="arrow-down"
          style={{ backgroundColor: "#1F2431" }}
        >
          <Select
            selectItem={receiver}
            list={wallets}
            config={{ search: true, input: true, type: "transactions" }}
            manualInput
            handleMenuItemClick={handleReciver}
          />
        </SelectWrapper>
      </div>
    </div>
  </FundsInfo>
);

export const AdvancedOptions = ({ type, onChange, value }) =>
  type === "etc" || type === "ech" ? (
    <GasBlock values={value} onChange={onChange} />
  ) : (
    <FeeBlock value={value.fee} onChange={onChange} />
  );

export const FeeBlock = ({ value, onChange }) => (
  <Hidden>
    <div className="wrapper">
      <span>Fee (Satoshi)</span>
      <Input
        value={value}
        onChange={e => onChange("fee", e.currentTarget.value)}
        type={"number"}
        style={{ width: "30%" }}
      />
    </div>
  </Hidden>
);

export const GasBlock = ({ values, onChange }) => {
  const { gasPrice, gasLimit } = values;
  return (
    <Hidden>
      <div className="wrapper">
        <span>Gas price (Gwei)</span>
        <div>
          <Input
            value={Number(gasPrice)}
            onChange={e => onChange("gasPrice", e.currentTarget.value)}
            type={"number"}
          />
          <span>Gas limit</span>
          <Input
            value={Number(gasLimit)}
            onChange={e => onChange("gasLimit", e.currentTarget.value)}
            type={"number"}
          />
        </div>
      </div>
    </Hidden>
  );
};

export const SendBlock = ({
  wallet,
  change,
  amount,
  handleReciver,
  receiver,
  onOpenOptions,
  options,
  onChange,
  isOpenOptions,
  mountActiveTabs,
  valid,
  error,
  balance,
  rop,
  changeROP,
  wallets
}) => (
  <div>
    <SenderBlock
      wallet={wallet}
      change={change}
      amount={amount}
      wallets={wallets}
      handleReciver={handleReciver}
      receiver={receiver}
      error={error}
      valid={valid}
      balance={balance}
      rop={rop}
      changeROP={changeROP}
    />
    <OpenOptions onClick={onOpenOptions}>Advanced options</OpenOptions>
    {isOpenOptions && (
      <AdvancedOptions value={options} onChange={onChange} type={wallet.type} />
    )}
    <div style={{ marginTop: "35px", marginRight: "20px", textAlign: "right" }}>
      <Next variant="outlined" onClick={mountActiveTabs} disabled={!valid}>
        Next
      </Next>
    </div>
  </div>
);

export const Confirmation = ({
  wallet,
  receiver,
  amount,
  options,
  applyTransaction,
  goBack
}) => (
  <Confirm>
    <div className="content">
      <div className="title-wrapper">
        <p>
          Please confirm the transaction parameters for
          <span>
            {amount} {wallet.type}
          </span>
        </p>
      </div>
      <div className="purpose-wrapper">
        <div className="purpose">From address</div>
        <div>{wallet.address}</div>
      </div>
      <div className="purpose-wrapper">
        <div className="purpose">To address</div>
        <div>{receiver.address}</div>
      </div>
      <div className="purpose-wrapper">
        <div className="purpose">Transaction fee</div>
        <div>
          {options.fee} {wallet.type.toUpperCase()}
        </div>
      </div>
      <div className="purpose-wrapper">
        <div className="purpose">Will be received</div>
        <div>
          {amount} {wallet.type.toUpperCase()}
        </div>
      </div>
    </div>
    <div className="confirm-block">
      <BackButton variant="outlined" onClick={goBack}>
        Back
      </BackButton>
      <Button variant="outlined" onClick={applyTransaction}>
        <span>Confirm</span>
      </Button>
    </div>
  </Confirm>
);

export const TxOutline = styled.a`
  letter-spacing: 0.4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const StatusTransaction = ({ hash, amount, status, wallet }) => (
  <Awaiting className="bg-arrow">
    {status === "Pending" && (
      <div>
        <p>Awaiting Exchange</p>
        <Dots className="loading" />
      </div>
    )}
    {status === "Failed" && (
      <div>
        <p>An error occurred, try again</p>
      </div>
    )}
    {status === "Finished" && (
      <div className="result">
        <p>
          Congratulations! You just sent
          <br />
          <span>
            {amount}
            {wallet.type.toUpperCase()}
          </span>
        </p>
        <p />
      </div>
    )}
    <div className="awaiting-info">
      <div>
        <p>Hash</p>
        <TxOutline
          className="order-value"
          target="_blank"
          href={
            config.hrefs[wallet.type]
              ? `${config.hrefs[wallet.type].transition}${hash}`
              : `${config.hrefs[curNames.ETH].transition}${hash}`
          }
        >
          {hash}
        </TxOutline>
      </div>
      <div>
        <p>Status</p>
        <p className="order-status">{status}</p>
      </div>
    </div>
  </Awaiting>
);
