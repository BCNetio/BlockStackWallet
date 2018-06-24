import React from 'react';
import { redirectToSignIn } from 'blockstack';
import Logo from '../images/dappy-logo.svg';
import { BackButton } from '../Views';

import styled, { css } from 'styled-components'

const LogoWrapper = styled.div`
  margin-bottom: 75px;
  margin-top: 60px;
  img{
    width: 127px;
    height: 25px;
  }
`;

const Greetings = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 30px;
  p{
    margin: 0;
  }
  .btn-wrapper{
    width: 100%;
    text-align: right;
    padding-right: 45px;
  }
  .information{
    background-color: #2B3649;
    padding: 20px;
    padding-top: 35px;
    max-width: 330px;
    box-shadow: 0 25px 40px 0 rgba(0,0,0,0.3);
    margin: 0 auto;
    p{
      text-align: left;
      &:first-child{
        color: #F1F1F1;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.32px;
        line-height: 16px;
        margin-bottom: 15px;
      }
      &:nth-of-type(2){
        color: #F1F1F1;
        font-size: 10px;
        letter-spacing: 0.23px;
        line-height: 16px;
        margin-bottom: 30px;
      }
    }
    button{
      border-radius: 2px;
      border: none;
      padding: 10px 0;
      background-color: #315EFB;
      color: #F1F1F1;
      font-size: 12px;
      letter-spacing: 0.3px;
      line-height: 14px;
      width: 100%;
      cursor: pointer;
    }
    + p{
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.28px;
      line-height: 14px;
      color: #8D96B2;
      margin-top: 25px;
      a{
        font-weight: 500;
        color: #F1F1F1;
        text-decoration: none;
      }
    }
  }
`;

export const Auth = () => (
  <Greetings>
    <div className="btn-wrapper">
      <BackButton HoverBase>Back to homepage</BackButton>
    </div>
    <div>
      <LogoWrapper>
        <img src={Logo} alt={'logo'} />
      </LogoWrapper>
      <div className="information">
        <p>Welcome to Dappy Wallet!</p>
        <p>Dappy Wallet is a non-custodial universal wallet. It doesn’t proceed user’s private key, it means that the customer is only the single person who is able to control the assets.</p>
        <button onClick={()=>{
        const origin = window.location.origin;
        redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
        }}> Sign in with Blockstack ID</button>
      </div>
      <p>New to Blockstack? <a href={'http://blockstack.org'}>Sign up in Blockstack
</a></p>
    </div>
  </Greetings>
);
