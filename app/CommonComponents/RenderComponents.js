import React from "react";
import styled from "styled-components";
import { has } from "ramda";
import { logos } from "../images/index";
import IconArrowGreen from "../images/common/icon-arrow-green.svg";
import { fiats } from "../images/fiat/index";

export const DropdawnWrapper = styled.div`
  position: absolute;
  right: ${props => (props.AlignRight ? "0" : "auto")};
  color: #000;
  z-index: 1000;
  max-height: 226px;
  width: 240px;
  margin-top: 10px;
  background-color: #fff;
  @media (max-width: 768px) {
    max-width: 145px;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    left: ${props => (props.AlignRight ? "auto" : "11px")};
    right: ${props => (props.AlignRight ? "11px" : "auto")};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6px solid #e2e4e8;
  }
  input.search {
    width: 100%;
    background-color: #e2e4e8;
    font-size: 12px;
    letter-spacing: 0.276923px;
    color: #8d96b2;
    padding: 10px;
    border: none;
    outline: none;
  }
  .scroll-wrapper {
    background: linear-gradient(
      180deg,
      rgba(31, 36, 49, 0.4) 0%,
      rgba(43, 54, 73, 4e-5) 100%
    );
    background-size: 100% 7px;
    background-repeat: no-repeat;
    padding-bottom: 5px;
  }
  div {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 180px;
    div {
      display: flex;
      align-items: center;
      padding: 7px 10px;
      overflow: visible;
      font-size: 10px;
      letter-spacing: 0.230769px;
      color: #2b3649;
      &.input-wrapper {
        padding: 10px;
        padding-left: 41px;
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      &:first-child {
        margin-top: 15px;
      }
      &:hover {
        background-color: #e2e4e8;
      }
    }
  }
`;

const ManualAddressInput = styled.input`
  border-radius: 2px;
  background-color: #1f2431;
  width: 200%;
  padding: 7px;
  border: none;
  color: #fff;
  &.light-grey {
    background-color: #e2e4e8;
    width: 200%;
    color: #000;
    padding: 20px 10px;
    font-size: 12px;
    letter-spacing: 0.276923px;
    color: #8d96b2;
  }
`;

export const transactionInput = ({ content, action }) => (
  <div onClick={action}>
    <div>{content ? <img src={logos[content.type]} /> : null}</div>
    <p>{content && content.alias ? content.alias : "--"}</p>
  </div>
);

export const transactionMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <img src={logos[content.type]} />
    <p>{has("alias", content) ? content.alias : content.type}</p>
  </div>
);

export const walletTypeInput = ({ content, action, index }) => (
  <div className="pseudo-select-wrapper">
    <div className="pseudo-select" onClick={() => action(index, content)}>
      <span className="wallet-name">
        <img src={IconArrowGreen} alt="Icon" />
        <p>{content.wType}</p>
      </span>
    </div>
  </div>
);

export const walletTypeMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <p>{content.wType}</p>
  </div>
);

export const walletInput = ({ content, action, index }) => (
  <div className="pseudo-select-wrapper">
    <div className="pseudo-select" onClick={() => action(index, content)}>
      <span className="wallet-name">
        <img src={logos[content.sysName]} />
        <p>
          {content.abbr}
          <span>{content.name}</span>
        </p>
      </span>
    </div>
  </div>
);

export const walletMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content[1])}>
    <img src={logos[content[1].sysName]} /> {content[1].abbr} {content[1].name}
  </div>
);

export const walletManualInput = ({
  content,
  action,
  index,
  onChange,
  value
}) => (
  <ManualAddressInput
    type="text"
    value={value}
    onChange={onChange}
    onClick={() => action(index, content)}
  />
);

export const chartInput = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>{content.name}</div>
);

export const fiatInput = ({ content, action, index }) => (
  <div className="dropdawn-fiat-wrapper" onClick={() => action(index, content)}>
    <div>
      <img src={fiats[content.abbr].x2} />
    </div>
    <span>{content.abbr}</span>
  </div>
);

export const fiatMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <img src={fiats[content.abbr].x2} /> {content.abbr} {content.name}
  </div>
);
