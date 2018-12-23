import styled, { css } from "styled-components";

// Icons
import IconArrowDown from "../../images/common/icon-arrow-down.svg";

// Styled
// One string in form
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }

  ${props =>
    props.mt20 &&
    css`
      margin-top: 20px;
    `}
`;

// Wrapper for input + select
export const DoubleInputSelectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

// Input for exchange
export const Input = styled.input`
  border-radius: 2px 0 0 2px;
  background-color: #1f2431;
  border: none;
  height: auto;
  padding-left: 20px;
  color: #fff;
  width: 194px;
  @media (max-width: 768px) {
    width: 40%;
    min-width: 50px;
  }
`;

// Dropdawn list
export const SelectWrapper = styled.div`
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

// Label for DoubleInputSelectWrapper
export const Label = styled.p`
  font-size: 11px;
  letter-spacing: 0.41px;
  line-height: 13px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

// Span for avalaible amount + error
export const Tooltip = styled.span`
  color: #8d96b2;
  font-size: 8px;
  letter-spacing: 0.2px;
  line-height: 9px;
  margin-left: 61px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
  &.error {
    color: red;
    display: block;
    margin-top: 10px;
  }
`;

// Button to next screen
export const NextButtonWrapper = styled.div`
  margin-top: 35px;
  text-align: right;
`;

export const Next = styled.button`
  border: 1px solid #8d96b2;
  border-radius: 14px;
  background: transparent;
  color: #8d96b2;
  padding: 5px 20px;
  cursor: pointer;
  margin-right: 5px;
  outline: none;
`;

// Info tabs
export const Tabs = styled.div`
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

//
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
