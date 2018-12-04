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
      isManualInput: false
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectListItem = this.selectListItem.bind(this);
    this.onSearchItem = this.onSearchItem.bind(this);
    this.openDropdown = this.openDropdown.bind(this);

    document.addEventListener("click", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  onOpenModal() {
    this.setState(({ isOpened }) => ({
      isOpened: !isOpened
    }));
  }

  onSearchItem(e) {
    this.setState({
      list: searachFunctions[this.props.config.type](e, this.props.list),
      serachPredicate: e
    });
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (!equals(this.props.list, prevProps.list)) {
      this.setState({ list: this.props.list });
    }
    return null;
  }

  handleClickOutside(e) {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line no-use-before-define
    (!domNode || !domNode.contains(e.target)) &&
      e.target.id !== "input" &&
      this.setState({
        isOpened: false,
        searchPredicate: "",
        list: this.props.list
      });
  }

  selectListItem(index, entity) {
    this.setState({ selectedIndex: index });
    this.props.handleMenuItemClick(entity);
  }

  openDropdown() {
    this.setState({ isOpened: true });
  }

  render() {
    const { selectItem, handleMenuItemClick } = this.props;
    const { isOpened, list, searchPredicate } = this.state;

    const MenuItem = config[this.props.config.type].menuItem;
    const Input = config[this.props.config.type].input;

    return (
      <div>
        <Input
          action={this.openDropdown}
          content={selectItem || head(this.props.list)}
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
