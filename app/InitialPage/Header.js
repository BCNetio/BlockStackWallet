import React from "react";
import { signUserOut, loadUserData, Person } from "blockstack";
import styled from "styled-components";
import Logo from "../images/dappy-logo.svg";
import ReactDOM from "react-dom";
import IconSupport from "../images/common/icon-support.svg";
import IconArrowDown from "../images/common/icon-arrow-down.svg";
import IconProfile from "../images/common/icon-profile.svg";
import IconLogOut from "../images/common/icon-log-out.svg";
import Fiat from "../Fiat/Fiat";
import { config } from "../AppConfig";

const LogoWrapper = styled.div`
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  color: #fff;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    order: 2;
    padding: 40px 10px;
    padding-top: 50px;
  }
`;

const HeaderControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  .left {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 195px;
    @media (max-width: 768px) {
      margin-right: 20px;
      width: 100%;
      margin-bottom: 20px;
      justify-content: flex-start;
    }
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
        height: 100%;
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
        width: 8px;
        height: 8px;
        transform: translateY(-50%) rotate(-90deg);
        background: url(${IconArrowDown}) no-repeat center/cover;
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
  .user-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    @media (max-width: 768px) {
      justify-content: flex-start;
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      width: 8px;
      height: 8px;
      transform: translateY(-50%) rotate(-90deg);
      background: url(${IconArrowDown}) no-repeat center/cover;
    }
    span {
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.3px;
      margin-right: 15px;
      position: relative;
    }
    div {
      width: 29px;
      height: 29px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
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
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  getSnapshotBeforeUpdate() {
    document.addEventListener("click", this.handleClickOutside, false);
    return null;
  }

  handleClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);
    (!domNode || !domNode.contains(e.target)) &&
      this.setState({ isOpened: false });
  };

  render() {
    return (
      <UserInfo>
        <div>
          <div
            className="user-info"
            onClick={() => this.setState({ isOpened: true })}
          >
            <span>
              {this.props.profile.name()
                ? this.props.profile.name()
                : "The name isn’t set in the profile "}
            </span>
            {this.props.profile.avatarUrl() && (
              <div>
                <img
                  src={this.props.profile.avatarUrl()}
                  alt={"avatar"}
                  height={40}
                  width={40}
                />
              </div>
            )}
          </div>
          {this.state.isOpened && (
            <div className="menu">
              <ul>
                <li>
                  <a
                    className="profile"
                    href={config.bsNodeProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
        <img src={Logo} alt={"logo"} />
      </LogoWrapper>
      <HeaderControl style={{}}>
        <div className="left">
          <Fiat />
        </div>
        <div className="right">
          <ProfilePopUp
            profile={profile}
            logout={() => signUserOut(window.location.origin)}
          />
        </div>
      </HeaderControl>
    </HeaderWrapper>
  );
};

export default Header;
