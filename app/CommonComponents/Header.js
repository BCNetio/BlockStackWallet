import React from 'react';
import { signUserOut, loadUserData, Person } from 'blockstack';
import ReactDOM from 'react-dom';
import Fiat from '../Fiat/Fiat';
import { config } from '../AppConfig';
import { HeaderWrapper, LogoWrapper, HeaderControl, UserInfo } from './Views';
import Logo from '../images/dappy-logo.svg';

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
    (!domNode || !domNode.contains(event.target)) && this.setState({ isOpened: false });
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
            <a href="https://dappy.freshdesk.com/support/home" target="_blank">
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
