import styled from "styled-components";

import ArrowDown from "../images/common/icon-arrow-down.svg";
import Eye from "../images/common/vision-off.svg";

export const PopupLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(43, 54, 73, 0.87);
`;

export const Popup = styled.div`
  background: #f1f2fa;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #fffffb;
  width: 330px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: background-color, opacity 0.7s ease;
  padding: ${props => (props.create ? "0" : "20px")};
  .title {
    font-weight: 500;
    line-height: normal;
    font-size: 14px;
    letter-spacing: 0.323077px;
    color: #2b3649;
    margin-bottom: 15px;
  }
  .description {
    line-height: 16px;
    font-size: 10px;
    letter-spacing: 0.230769px;
    color: #2b3649;
    margin-bottom: 20px;
    &.key {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .pseudo-select-wrapper {
    cursor: pointer;
    &:not(:first-child) {
      margin-top: 10px;
    }
    .pseudo-select {
      padding: 10px;
      padding-right: 0;
      border: 1px solid #d5d9e5;
      border-radius: 2px;
      height: 31px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .wallet-name {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        p {
          font-size: 10px;
          text-align: center;
          letter-spacing: 0.230769px;
          color: #2b3649;
          span {
            color: #8d96b2;
            display: inline-block;
            margin-left: 4px;
          }
        }
      }
      &:after {
        content: "";
        display: block;
        width: 31px;
        height: 100%;
        border-radius: 0px 0px 2px 2px;
        background: #315efb url(${ArrowDown}) no-repeat center;
        transform: rotate(-90deg);
        position: absolute;
        right: -2px;
        top: 0;
      }
    }
  }
  .private-key {
    background: url(${Eye}) no-repeat 95% 50%;
    width: 100%;
    border: 1px solid #d5d9e5;
    margin-top: 10px;
    border-radius: 2px;
    height: 31px;
    padding-left: 10px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 47%;
    }
  }
  .key-wrapper {
    margin: 20px 0;
    border: 1px solid #8d96b2;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 20px 40px;
    p {
      font-size: 10px;
      letter-spacing: 0.25px;
    }
    .name {
      color: #8d96b2;
    }
    .value {
      color: #2b3649;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
