import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { head, last } from "ramda";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled, { css } from "styled-components";
import PrivateKey from "./PrivateKey";
import MakeActive from "./MakeActive";
import DeleteWallet from "./DeleteWallet";
import Customisation from "./Customisation";

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: -5px;
  transform: rotate(90deg);
  button {
    width: 25px;
    height: 25px;
  }
  svg {
    fill: #8d96b2;
  }
`;

const optionList = (wallet = null) => {
  const makeActive =
    wallet && wallet.readOnly
      ? ["Read to Write", MakeActive]
      : ["Private Key", PrivateKey];

  return new Map([
    makeActive,
    ["Delete", DeleteWallet],
    ["Customize", Customisation]
  ]);
};

class LongMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = option => {
    if (typeof option === "function")
      this.props.callModal(option, { wid: this.props.wid });
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <Dropdown>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          className="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              fontSize: 12
            }
          }}
        >
          {Array.from(optionList(this.props.wallet)).map(option => (
            <MenuItem
              key={option}
              onClick={() => this.handleClose(last(option))}
            >
              {head(option)}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>
    );
  }
}

export default LongMenu;
