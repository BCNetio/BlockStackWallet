import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { equals, lensPath, view } from "ramda";
import IconArrowDownGrey from "../../images/common/icon-arrow-down-grey.svg";
import AddCustomEthToken from "./AddCustomEthToken";

const styles = {
  card: {
    height: "auto",
    minHeight: "220px",
    position: "relative",
    backgroundColor: "#2B3649",
    color: "#FFFFFF",
    fontSize: 12,
    textOverflow: "ellipsis",
    boxShadow: "0 25px 40px 0 rgba(0,0,0,0.3)",
    transition: "background-color 0.7s ease",
    paddingBottom: "0",
    borderRadius: "0 0 2px 2px"
  }
};

export const TokenWrapper = styled.div`
  background: linear-gradient(
      180deg,
      rgba(31, 36, 49, 0.4) 0%,
      rgba(43, 54, 73, 0.4) 100%
    )
    no-repeat;
  background-size: 100% 7px;
  .title-wrapper,
  li {
    display: flex;
    justify-content: space-between;
  }
  ul {
    padding: 0 20px;
    width: 100%;
    margin: 0;
    li {
      position: relative;
      padding-left: 25px;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #315efb;
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      span:first-child {
        font-size: 12px;
        letter-spacing: 0.3px;
        color: #ffffff;
      }
      span:last-child {
        font-size: 10px;
        letter-spacing: 0.25px;
        color: #8d96b2;
      }
    }
  }
  .title-wrapper {
    margin-bottom: 20px;
    padding: 0 20px;
    padding-top: 20px;
    p {
      font-size: 14px;
      letter-spacing: 0.35px;
      color: #ffffff;
    }
    button {
      font-size: 12px;
      text-align: right;
      letter-spacing: 0.3px;
      color: #7ac231;
      border: none;
      background-color: transparent;
      padding: 0;
    }
  }
  .btn-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: #273041;
    padding: 12px 0;
    button {
      font-size: 10px;
      letter-spacing: 0.25px;
      color: #8d96b2;
      border: none;
      background: transparent;
      background: url(${IconArrowDownGrey}) no-repeat 90% 50%;
      padding-right: 25px;
    }
  }
`;

const minute = 60000;

export class Tokens extends React.Component {
  constructor(props) {
    super(props);
    const { type, address } = props.wallet;
    if (
      !props.wallet.tokens ||
      !props.wallet.tokens.tokenList ||
      Date.now() - Date.parse(this.props.wallet.tokens.updated) > minute * 5
    ) {
      type === "eth" ? props.fetchTokens(type, address) : null;
    }

    this.lens = lensPath(["wallet", "tokens", "tokenList"]) || [];
  }

  focus = props => view(this.lens, props);

  shouldComponentUpdate(nextProps) {
    return !equals(nextProps.wallet, this.props.wallet);
  }

  render() {
    return (
      <TokensLayout
        tokens={this.focus(this.props)}
        callModal={this.props.callModal}
        wallet={this.props.wallet}
      />
    );
  }
}

export const TokensLayout = withStyles(styles)(
  ({ classes, tokens, callModal, wallet }) => (
    <Card className={classes.card}>
      <TokenWrapper>
        <div className="title-wrapper">
          <p>Tokens</p>
          <button onClick={() => callModal(AddCustomEthToken, { wallet })}>
            Add tokens
          </button>
        </div>
        <ul>
          {tokens &&
            tokens.map(token => (
              <li key={token.tokenInfo.address}>
                <span>
                  {token.balance / 10 ** token.tokenInfo.decimals}{" "}
                  {token.tokenInfo.symbol}
                </span>
                {token.tokenInfo.price.rate ? (
                  <span>
                    {(
                      (token.balance / 10 ** token.tokenInfo.decimals) *
                      parseFloat(token.tokenInfo.price.rate)
                    ).toFixed(2)}{" "}
                    USD
                  </span>
                ) : null}
              </li>
            ))}
        </ul>
        <div className="btn-wrapper">
          <button>Show more tokens</button>
        </div>
      </TokenWrapper>
    </Card>
  )
);
