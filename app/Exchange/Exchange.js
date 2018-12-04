import React from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "./Actions";
import StartExchange from "./StartExchange";
import Confirmation from "./Confirmation";
import StatusExchange from "./StatusExchange";
import Divider from "@material-ui/core/Divider";

import styled, { css } from "styled-components";
import IconSwap from "../images/common/icon-swap.svg";

const styles = {
  card: {
    width: 450,
    height: 380,
    backgroundColor: "#2B3649",
    color: "#FFFFFF",
    textOverflow: "ellipsis",
    position: "relative",
    overflow: "visible"
  }
};

const Title = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
    letter-spacing: 0.26px;
    line-height: 16px;
    position: relative;
    &:after {
      content: "";
      display: block;
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 12px;
      background-image: url(${IconSwap});
    }
  }
`;

const ExchangeWrapper = styled.div`
  @media (max-width: 993px) {
    margin: 0 auto;
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

const tabs = [
  { name: "Start Exchange", value: 1, render: <StartExchange /> },
  { name: "Confirmation", value: 2, render: <Confirmation /> },
  { name: "Exchange detalls", value: 3, render: <StatusExchange /> }
];

class Exchange extends React.Component {
  render() {
    return (
      <ExchangeWrapper>
        <Card className={this.props.classes.card}>
          <Title>
            <span className="swap">Exchange your funds</span>
            {this.props.activeTabId === 2 && (
              <Button onClick={() => this.props.mountActiveTab(0)}>
                New Order
              </Button>
            )}
          </Title>
          <Divider style={{ backgroundColor: "rgba(141,150,178,0.1)" }} />
          <div style={{ padding: "20px", paddingTop: "25px" }}>
            {tabs[this.props.activeTabId].render}
          </div>
        </Card>
      </ExchangeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.exchange.wallets,
  activeTabId: state.exchange.activeTabId
});

const mapDispatchToProps = dispatch => ({
  fetchWallets: () => dispatch(actions.fetchWallets()),
  mountActiveTab: tabId => dispatch(actions.mountActiveTab(tabId))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Exchange)
);
