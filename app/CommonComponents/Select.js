import React from 'react';
import { v4 } from 'uuid';
import { logos } from '../images';
import { fiats } from '../images/fiat/index';
import { has } from 'ramda';
import { searachFunctions } from './PopUp/config';
import ReactDOM from 'react-dom';
import SearchBar from './PopUp/Search';
import InputForAddres from './PopUp/InputForAddres';
import IconArrowGreen from '../images/common/icon-arrow-green.svg';
import styled, { css } from 'styled-components';

const DropdawnWrapper = styled.div`
  position: absolute;
  right: ${props => (props.AlignRight ? '0' : 'auto')};
  color: #000;
  z-index: 1000;
  max-height: 226px;
  width: 240px;
  margin-top: 10px;
  background-color: #fff;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -6px;
    left: ${props => (props.AlignRight ? 'auto' : '11px')};
    right: ${props => (props.AlignRight ? '11px' : 'auto')};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6px solid #e2e4e8;
  }
  input.search {
    width: 100%;
    background-color: #e2e4e8;
    font-size: 12px;
    letter-spacing: 0.276923px;
    color: #8d96b2;
    padding: 10px;
    border: none;
    outline: none;
  }
  .scroll-wrapper {
    background: linear-gradient(180deg, rgba(31, 36, 49, 0.4) 0%, rgba(43, 54, 73, 4e-5) 100%);
    background-size: 100% 7px;
    background-repeat: no-repeat;
    padding-bottom: 5px;
  }
  div {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 180px;
    div {
      display: flex;
      align-items: center;
      padding: 7px 10px;
      overflow: visible;
      font-size: 10px;
      letter-spacing: 0.230769px;
      color: #2b3649;
      &.input-wrapper {
        padding: 10px;
        padding-left: 41px;
      }
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      &:first-child {
        margin-top: 15px;
      }
      &:hover {
        background-color: #e2e4e8;
      }
    }
  }
`;

const transactionInput = ({ content, action }) => (
  <div onClick={action}>
    <div>
      { content ? <img src={logos[content.type]} /> : null}
    </div>
    <p>{ content && content.alias ? content.alias : "--"}</p>
  </div>
);

const tranactionMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <img src={logos[content.type]} /> <p>{has('alias', content) ? content.alias : content.type}</p>
  </div>
);

const walletTypeInput = ({ content, action, index }) => (
  <div className="pseudo-select-wrapper">
    <div className="pseudo-select" onClick={() => action(index, content)}>
      <span className="wallet-name">
        <img src={IconArrowGreen} alt="Icon" />
        <p>{content.wType}</p>
      </span>
    </div>
  </div>
);

const walletTypeMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <p>{content.wType}</p>
  </div>
);

const walletInput = ({ content, action, index }) => (
  <div className="pseudo-select-wrapper">
    <div className="pseudo-select" onClick={() => action(index, content)}>
      <span className="wallet-name">
        <img src={logos[content.sysName]} />
        <p>
          {content.abbr}
          <span>{content.name}</span>
        </p>
      </span>
    </div>
  </div>
);

const walletMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content[1])}>
    <img src={logos[content[1].sysName]} /> {content[1].abbr} {content[1].name}
  </div>
);

const chartInput = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>{content.name}</div>
);

const fiatInput = ({ content, action, index }) => (
  <div className="dropdawn-fiat-wrapper" onClick={() => action(index, content)}>
    <div>
      <img src={fiats[content.abbr].x2} />
    </div>
    <span>{content.abbr}</span>
  </div>
);

const fiatMenuItem = ({ content, action, index }) => (
  <div onClick={() => action(index, content)}>
    <img src={fiats[content.abbr].x2} /> {content.abbr} {content.name}
  </div>
);
const config = {
  transactions: { input: transactionInput, menuItem: tranactionMenuItem },
  chart: { input: chartInput, menuItem: walletMenuItem },
  fiat: { input: fiatInput, menuItem: fiatMenuItem },
  wallet: { input: walletInput, menuItem: walletMenuItem },
  walletType: { input: walletTypeInput, menuItem: walletTypeMenuItem },
};

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selectedIndex: 0,
      searchPredicate: '',
      address: '',
      addAdr: false,
      list: props.list,
    };
  }

  onOpenModal = (e) => {
    this.setState(({ isOpened }) => ({
      isOpened: !isOpened,
    }));
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  getSnapshotBeforeUpdate() {
    document.addEventListener('click', this.handleClickOutside, false);
    return null;
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this);
    (!domNode || !domNode.contains(event.target)) &&
      event.target.id !== 'input' &&
      this.setState({ isOpened: false, searchPredicate: '', list: this.props.list });
  };

  selectListItem = (index, entity) => {
    this.setState({ selectedIndex: index });
    this.props.handleMenuItemClick(entity);
  };

  onSearchItem = (e) => {
    this.setState(({ list }) => ({
      list: searachFunctions[this.props.config.type](e, this.props.list),
      serachPredicate: e,
    }));
  };

  render() {
    const MenuItem = config[this.props.config.type].menuItem;
    const Input = config[this.props.config.type].input;
    return (
      <div>
        <Input action={() => this.setState({ isOpened: true })} content={this.props.selectItem} />
        {this.state.isOpened && (
          <DropdawnWrapper>
            {this.props.config.search && <SearchBar onSearchItem={this.onSearchItem} />}
            <div className="scroll-wrapper">
              {this.state.list.length
                ? this.state.list.map((el, index) => (
                  <MenuItem key={v4()} content={el} action={this.selectListItem} index={index} />
                  ))
                : `No results for "${this.state.serachPredicate}"`}
              {this.props.config.input && (
                <InputForAddres
                  handleMenuItemClick={this.props.handleMenuItemClick}
                  closePopUp={this.onOpenModal}
                />
              )}
            </div>
          </DropdawnWrapper>
        )}
      </div>
    );
  }
}

export default Select;
