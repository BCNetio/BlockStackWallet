import React from 'react';
import { signUserOut, loadUserData, Person } from 'blockstack';
import styled from 'styled-components';
import Logo from '../images/dappy-logo.svg';
import ReactDOM from 'react-dom';
import IconSupport from '../images/common/icon-support.svg';
import IconArrowDown from '../images/common/icon-arrow-down.svg';
import IconProfile from '../images/common/icon-profile.svg';
import IconLogOut from '../images/common/icon-log-out.svg';
import Fiat from '../Fiat/Fiat';
import { config } from '../AppConfig';

const LogoWrapper = styled.div`
  width: 15%;
  padding-left: 35px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px;
  color: #fff;
`;

const HeaderControl = styled.div`
  width: 85%;
  display: flex;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .right {
    width: 32%;
    text-align: right;
  }
  .switch-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    .text {
      font-size: 12px;
      margin-left: 10px;
      cursor: pointer;
    }
    label {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .support {
    margin-left: 50px;
    a {
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.3px;
      position: relative;
      color: #fff;
      text-decoration: none;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -30px;
        width: 16px;
        height: 13px;
        transform: translateY(-50%);
        background: url(${IconSupport}) no-repeat;
      }
    }
  }
  .dropdawn-fiat-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
      width: 14px;
      height: 14px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        object-fit: cover;
        width: 100%;
      }
    }
    span {
      position: relative;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -20px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
    }
  }
  .dropdawn-wallet-wrapper {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    div {
      position: relative;
      display: flex;
      align-items: center;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -20px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
      img {
        width: 36px;
        height: 36px;
        margin-left: 15px;
      }
      span {
        font-size: 16px;
        text-align: right;
        letter-spacing: 0.4px;
      }
    }
  }
`;

const UserInfo = styled.div`
  position: relative;
  > div {
    display: inline-block;
  }
  .user-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    padding-right: 25px;
    span {
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.3px;
      margin-right: 15px;
      position: relative;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: -60px;
        width: 9px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat;
      }
    }
    div {
      width: 29px;
      height: 29px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .menu {
    position: absolute;
    right: 9px;
    margin-top: 20px;
    z-index: 100;
    background-color: #f1f1f1;
    padding-bottom: 8px;
    padding-top: 15px;
    border-radius: 5px;
    text-align: left;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -9px;
      right: 20px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 9px solid #f1f1f1;
    }
    ul {
      li {
        cursor: pointer;
        &:hover {
          background-color: #e2e4e8;
        }
        a {
          font-size: 10px;
          letter-spacing: 0.230769px;
          color: #2b3649;
          text-decoration: none;
          position: relative;
          padding: 5px 40px 5px 35px;
          display: block;
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
            width: 10px;
            height: 10px;
          }
          &.profile:before {
            background: url(${IconProfile}) no-repeat;
          }
          &.log-out:before {
            background: url(${IconLogOut}) no-repeat;
          }
        }
      }
    }
  }
`;

class ProfilePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  getSnapshotBeforeUpdate() {
    document.addEventListener('click', this.handleClickOutside, false);
    return null;
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    (!domNode || !domNode.contains(e.target)) && this.setState({ isOpened: false });
  };

  render() {
    return (
      <UserInfo>
        <div>
          <div className="user-info" onClick={() => this.setState({ isOpened: true })}>
            <span>
              {this.props.profile.name()
                ? this.props.profile.name()
                : 'The name isn’t set in the profile '}
            </span>
            {this.props.profile.avatarUrl() && (
              <div>
                <img src={this.props.profile.avatarUrl()} alt={'avatar'} height={40} width={40} />
              </div>
            )}
          </div>
          {this.state.isOpened && (
            <div className="menu">
              <ul>
                <li>
                  <a className="profile" href={config.bsNodeProfile} target="_blank">
                    Blockstack profile
                  </a>
                </li>
                <li>
                  <a className="log-out" onClick={this.props.logout}>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </UserInfo>
    );
  }
}

const Header = () => {
  const userData = loadUserData();
  const profile = new Person(userData ? userData.profile : null);

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={Logo} alt={'logo'} />
      </LogoWrapper>
      <HeaderControl style={{}}>
        <div className="left">
          <Fiat />
          <div className="support">
            <a href="https://dappy.freshdesk.com/support/home" target="_blank" rel="noopener noreferrer">
              Support
            </a>
          </div>
        </div>
        <div className="right">
          <ProfilePopUp profile={profile} logout={() => signUserOut(window.location.origin)} />
        </div>
      </HeaderControl>
    </HeaderWrapper>
  );
};

export default Header;
