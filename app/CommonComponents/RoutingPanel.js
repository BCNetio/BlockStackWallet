import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import AccountBalance from "@material-ui/icons/AccountBalanceWallet";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Exchange from "@material-ui/icons/SwapHoriz";

import styled, { css } from "styled-components";

import IconDashboard from "../images/nav/icon-dashboard.svg";
import IconDashboardHover from "../images/nav/icon-dashboard-hover.svg";

import IconWallet from "../images/nav/icon-wallet.svg";
import IconWalletHover from "../images/nav/icon-wallet-hover.svg";

import IconExchange from "../images/nav/icon-exchange.svg";
import IconExchangeHover from "../images/nav/icon-exchange-hover.svg";

const styles = {
  navItem: {
    color: "#FFFFFF"
  }
};

const Navbar = styled.div`
  width: 15%;
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  nav {
    > div {
      padding: 0;
      padding-left: 35px;
      margin-bottom: 30px;
    }
    div {
      p {
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.24px;
        color: #8d96b2;
        position: relative;
        padding-left: 40px;
        display: inline-block;
        &:hover {
          color: #fff;
        }
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background-repeat: no-repeat;
        }
      }
      &:hover {
        background-color: transparent;
      }
      &:first-child {
        p {
          &:before {
            background-image: url(${IconDashboard});
            width: 17px;
            height: 17px;
          }
          &:hover {
            &:before {
              background-image: url(${IconDashboardHover});
            }
          }
        }
      }
      &:nth-child(2) {
        p {
          &:before {
            background-image: url(${IconWallet});
            width: 17px;
            height: 15px;
          }
          &:hover {
            &:before {
              background-image: url(${IconWalletHover});
            }
          }
        }
      }
      &:nth-child(3) {
        p {
          &:before {
            background-image: url(${IconExchange});
            width: 17px;
            height: 11px;
          }
          &:hover {
            &:before {
              background-image: url(${IconExchangeHover});
            }
          }
        }
      }
    }
  }
`;

export const RoutingPanel = withStyles(styles)(({}) => (
  <Navbar>
    <List component="nav">
      <MenuItem text={"Dashboard"} destination={"/"} />
      <MenuItem text={"Wallets"} destination={"/wallets"} />
      <MenuItem text={"Exchange"} destination={"/exchange"} />
    </List>
  </Navbar>
));

const MenuItem = withRouter(({ history, text, destination }) => (
  <ListItem button onClick={() => history.push(destination)}>
    <ListItemText
      disableTypography
      primary={<Typography type="body2">{text}</Typography>}
    />
  </ListItem>
));
