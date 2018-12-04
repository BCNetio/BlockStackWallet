import styled from "styled-components";

export const LeftColumnContainer = styled.div`
  flex-grow: 1;
  min-width: 320px;
  width: 30%;
  margin-right: 20px;

  @media (max-width: 1200px) {
    max-width: 45%;
    height: auto;
  }
  @media (max-width: 1000px) {
    min-width: 95%;
    max-width: 95%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

export const BalanceCard = styled.div`
  .title {
    color: #f1f1f1;
    font-size: 14px;
    letter-spacing: 0.26px;
    line-height: 16px;
    margin: 0;
    margin-bottom: 32px;
  }
  .subtitle {
    color: #ffffff;
    font-size: 12px;
    letter-spacing: 0.3px;
    line-height: 14px;
    margin: 0;
    margin-bottom: 10px;
    margin-top: 35px;
    span {
      font-size: 8px;
      text-align: right;
      letter-spacing: 0.2px;
      color: #8d96b2;
      display: inline-block;
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .total {
    color: #ffffff;
    font-size: 28px;
    font-weight: 300;
    letter-spacing: 0.19px;
    line-height: 33px;
    margin: 0;
    margin-bottom: 5px;
  }
  .currency {
    color: #8d96b2;
    font-size: 12px;
    letter-spacing: 0.3px;
    line-height: 14px;
    margin: 0;
  }
  .wallets-number {
    background-color: #1f2431;
    height: 60px;
    width: 65px;
    text-align: center;
    border-radius: 2px;
    p:first-child {
      color: #8d96b2;
      font-size: 28px;
      font-weight: 300;
      letter-spacing: 0.25px;
      line-height: 33px;
      margin: 0;
      margin-top: 5px;
    }
    p:last-child {
      color: #8d96b2;
      font-size: 12px;
      letter-spacing: 0.28px;
      line-height: 14px;
      margin: 0;
      margin-bottom: 10px;
    }
  }
  .address {
    margin: 0;
    padding: 10px;
    background-color: rgba(241, 241, 241, 0.1);
    border-radius: 2px 0 0 2px;
    height: auto;
    width: 90%;
    overflow: hidden;
  }
`;
