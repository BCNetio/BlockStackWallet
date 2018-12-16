import React from "react";
import { v4 } from "uuid";
import { equals, head } from "ramda";
import ReactDOM from "react-dom";
import { searachFunctions } from "./PopUp/config";
import SearchBar from "./PopUp/Search";
import InputForAddres from "./PopUp/InputForAddres";

import {
  DropdawnWrapper,
  transactionInput,
  transactionMenuItem,
  chartInput,
  walletMenuItem,
  fiatInput,
  fiatMenuItem,
  walletInput,
  walletTypeMenuItem,
  walletTypeInput,
  walletManualInput
} from "./RenderComponents";

const config = {
  transactions: { input: transactionInput, menuItem: transactionMenuItem },
  chart: { input: chartInput, menuItem: walletMenuItem },
  fiat: { input: fiatInput, menuItem: fiatMenuItem },
  wallet: { input: walletInput, menuItem: walletMenuItem },
  walletManualInput: {
    input: walletManualInput,
    menuItem: transactionMenuItem
  },
  walletType: { input: walletTypeInput, menuItem: walletTypeMenuItem }
};

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selectedIndex: 0,
      searchPredicate: "",
      address: "",
      addAdr: false,
      list: props.list,
      inputSwitcher: props.config.type,
      isManualInputOn: false
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectListItem = this.selectListItem.bind(this);
    this.onSearchItem = this.onSearchItem.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.handleManualInput = this.handleManualInput.bind(this);
    this.switchInputType = this.switchInputType.bind(this);

    document.addEventListener("click", this.handleClickOutside, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !equals(this.props, nextProps) ||
      !equals(this.state.isOpened, nextState.isOpened) ||
      !equals(this.state.address, nextState.address) ||
      !equals(this.state.list, nextState.list)
    );
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  onOpenModal() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  onSearchItem(e) {
    this.setState({
      list: searachFunctions[this.props.config.type](e, this.props.list),
      searchPredicate: e
    });
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (!equals(this.props.list, prevProps.list)) {
      this.setState({ list: this.props.list });
    }
    return null;
  }

  handleManualInput(e) {
    this.setState({ address: e.currentTarget.value });
    this.props.handleMenuItemClick({ address: e.currentTarget.value });
  }

  handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line
    (!domNode || !domNode.contains(e.target)) && // eslint-disable-line
      e.target.id !== "input" &&
      this.setState({
        isOpened: false,
        searchPredicate: "",
        list: this.props.list
      });
  }

  selectListItem(index, entity) {
    this.setState({ selectedIndex: index, isManualInputOn: false });
    this.props.handleMenuItemClick(entity);
  }

  switchInputType() {
    if (this.props.manualInput) {
      this.setState({
        isManualInputOn: !this.state.isManualInputOn,
        isOpened: !this.state.isOpened
      });
    }
  }

  openDropdown() {
    this.setState({ isOpened: true });
  }

  render() {
    const { selectItem, handleMenuItemClick, manualInput } = this.props;
    const {
      isOpened,
      list,
      searchPredicate,
      isManualInputOn,
      address
    } = this.state;
    const MenuItem = config[this.props.config.type].menuItem;
    const Input =
      manualInput && isManualInputOn
        ? config.walletManualInput.input
        : config[this.props.config.type].input;

    return (
      <div>
        <Input
          action={this.openDropdown}
          content={selectItem || head(this.props.list)}
          value={address}
          onChange={this.handleManualInput}
        />
        {isOpened && (
          <DropdawnWrapper>
            {this.props.config.search && (
              <SearchBar onSearchItem={this.onSearchItem} />
            )}
            <div className="scroll-wrapper">
              {list.length
                ? list.map((el, index) => (
                    <MenuItem
                      key={v4()}
                      content={el}
                      action={this.selectListItem}
                      index={index}
                    />
                  ))
                : `No results for "${searchPredicate}"`}
              {this.props.config.input && (
                <InputForAddres
                  handleMenuItemClick={handleMenuItemClick}
                  onClick={this.switchInputType}
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
