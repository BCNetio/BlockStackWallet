import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { navIcons } from '../images/nav/index';

const Item = styled.div.attrs({})`
  p {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.24px;
    color: ${props => (props.active ? '#FFFFFF' : '#8d96b2')};
    position: relative;
    padding-left: 40px;
    display: inline-block;
    &:hover {
      color: #fff;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-repeat: no-repeat;
    }
    &:before {
      background-image: url(${props =>
        props.active ? navIcons[props.icon].hover : navIcons[props.icon].icon});
      width: 20px;
      height: 20px;
    }
    &:hover {
      &:before {
        background-image: url(${props => navIcons[props.icon].hover});
      }
    }
  }
`;

const Navbar = styled.div`
  width: 15%;
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  div {
    padding: 0;
    padding-left: 35px;
    margin-bottom: 30px;
  }
`;

export const RoutingPanel = () => (
  <Navbar>
    <MenuItem text={'Dashboard'} destination={'/'} icon="dashboard" />
    <MenuItem text={'Wallets'} destination={'/wallets'} icon="wallet" />
    <MenuItem text={'Exchange'} destination={'/exchange'} icon="exchange" />
  </Navbar>
);

const MenuItem = withRouter(({ history, text, destination, icon }) => (
  <Item
    active={history.location.pathname === destination}
    icon={icon}
    onClick={() => history.push(destination)}
  >
    <p>{text}</p>
  </Item>
));
