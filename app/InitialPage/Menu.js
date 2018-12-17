import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styled, { css } from 'styled-components';

// Icons
import IconDashboard from '../images/nav/icon-dashboard.svg';
import IconDashboardHover from '../images/nav/icon-dashboard-hover.svg';
import IconWallet from '../images/nav/icon-wallet.svg';
import IconWalletHover from '../images/nav/icon-wallet-hover.svg';
import IconExchange from '../images/nav/icon-exchange.svg';
import IconExchangeHover from '../images/nav/icon-exchange-hover.svg';

// Styled
const Navbar = styled.div`
  width: 15%;
  input[type=checkbox], >span{
    display: none;
  }
  nav{
    padding-left: 20px;
    > div{
      padding: 0;
      margin-bottom: 30px;
    }
    div{
      p {
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.24px;
        color: #8D96B2;
        position: relative;
        padding-left: 40px;
        display: inline-block;
        &:hover{
          color: #fff;
        }
        &:before{
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background-repeat: no-repeat;
        }
      }
      &:hover{
        background-color: transparent;
      }
      &:first-child{
        p{
          &:before{
            background-image: url(${IconDashboard});
            width: 17px;
            height: 17px;
          }
          &:hover{
            &:before{
              background-image: url(${IconDashboardHover});
            }
          }
        }
      }
      &:nth-child(2){
        p{
          &:before{
            background-image: url(${IconWallet});
            width: 17px;
            height: 15px;
          }
          &:hover{
            &:before{
              background-image: url(${IconWalletHover});
            }
          }
        }
      }
      &:nth-child(3){
        p{
          &:before{
            background-image: url(${IconExchange});
            width: 17px;
            height: 11px;
          }
          &:hover{
            &:before{
              background-image: url(${IconExchangeHover});
            }
          }
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 768px) {
    width: auto;
    display: block;
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 100;
    -webkit-user-select: none;
    user-select: none;
    order: 1;
    input[type=checkbox]{
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;
      cursor: pointer;
      opacity: 0;
      z-index: 2;
      -webkit-touch-callout: none;
      &:checked ~ span{
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #fff;
      }
      &:checked ~ span:nth-last-child(3){
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      &:checked ~ span:nth-last-child(2){
        transform: rotate(-45deg) translate(0, -1px);
      }
      &:checked ~ nav{
        transform: translate(0%, 0);
      }
      &:not(:checked) ~ nav{
        transform: translate(-100%, 0);
      }
    }
    >span{
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      &:first-child{
        transform-origin: 0% 0%;
      }
      &:nth-last-child(2){
        transform-origin: 0% 100%;
      }
    }
    nav{
      position: absolute;
      width: 100vw;
      margin-top: -100px;
      padding-top: 135px;
      margin-left: -10px;
      background: rgb(43, 54, 73, 0.9);
      list-style-type: none;
      -webkit-font-smoothing: antialiased;
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      div{
        p{
          color: #fff;
        }
        &:first-child{
          p{
            &:before{
              background-image: url(${IconDashboardHover});
            }
          }
        }
        &:nth-child(2){
          p{
            &:before{
              background-image: url(${IconWalletHover});
            }
          }
        }
        &:nth-child(3){
          p{
            &:before{
              background-image: url(${IconExchangeHover});
            }
          }
        }
      }
    }
  }
`;

// Component
class NavbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_checked: false,
    };
    this.clickCheckbox = this.clickCheckbox.bind(this);
    this.clickMenu = this.clickMenu.bind(this);
  }
  clickCheckbox(event) {
    this.setState({is_checked: !this.state.is_checked});
  }
  clickMenu(event) {
    this.setState({is_checked: !this.state.is_checked});
  }

  render() {
    return (
      <Navbar>
        <input
          type="checkbox"
          onChange={this.clickCheckbox}
          checked={this.state.is_checked}
        />
        <span></span>
        <span></span>
        <span></span>
        <List component="nav" onClick={this.clickMenu}>
          <MenuItem text={'Dashboard'} destination={'/'} />
          <MenuItem text={'Wallets'} destination={'/wallets'} />
          <MenuItem text={'Exchange'} destination={'/exchange'} />
        </List>
      </Navbar>
    );
  }
}

const MenuItem = withRouter(({ history, text, destination }) => (
  <ListItem button onClick={() => history.push(destination)}>
    <ListItemText
      disableTypography
      primary={
        <Typography type="body2">
          {text}
        </Typography>
      }
    />
  </ListItem>
));

export default NavbarWrapper;