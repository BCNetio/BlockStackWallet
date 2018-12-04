import React from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { head } from "ramda";
import { updateWalletList } from "./Actions";
import { PopupLayout } from "../../Views";
import { Popup } from "../../Views";
import { CloseUpButton } from "../../Views";
import { PopupButton } from "../../Views";

class Error extends React.Component {
  render() {
    return (
      <PopupLayout>
        <CloseUpButton onClick={this.props.closeModal} />
        <Popup>
          <p className="title">Error message</p>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
            cupiditate molestias laboriosam blanditiis similique! Distinctio
            placeat odit magnam nihil pariatur.
          </p>
          <PopupButton onClick={this.props.closeModal}>Ok</PopupButton>
        </Popup>
      </PopupLayout>
    );
  }
}

export default Error;
