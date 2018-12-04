import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { deleteWallet } from "./Actions";
import { PopupLayout } from "../../Views";
import { Popup } from "../../Views";
import { CloseUpButton } from "../../Views";
import { PopupButton } from "../../Views";
import { PopupGreyButton } from "../../Views";

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList
});

const mapDispatchToProps = dispatch => ({
  delete: (wallets, toBeDeleted) => dispatch(deleteWallet(wallets, toBeDeleted))
});

const styles = {
  input: {
    width: "100%"
  }
};

class DeleteWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmation: "",
      isConfirmed: false
    };
    this.origin = "Yes, I really want to delete this wallet!";
  }

  handleConfirmation = e => {
    this.setState({
      confirmation: e.currentTarget.value,
      isConfirmed: this.origin === e.currentTarget.value
    });
  };

  render() {
    return (
      <PopupLayout>
        <Popup>
          <CloseUpButton onClick={this.props.closeModal} />
          <p className="title">Are you sure?</p>
          <InputLabel htmlFor="controlled-open-select" style={{ fontSize: 15 }}>
            For deletion please type:
            <br /> {this.origin}
          </InputLabel>
          <TextField
            onChange={this.handleConfirmation}
            label="Confirmation"
            helperText="fill this field."
            style={styles.input}
          />
          <div className="btn-wrapper">
            <PopupGreyButton onClick={this.props.closeModal}>
              No
            </PopupGreyButton>
            <PopupButton
              onClick={() => {
                this.props.delete(this.props.wallets, this.props.options.wid);
                this.props.closeModal();
              }}
              disabled={!this.state.isConfirmed}
            >
              Delete
            </PopupButton>
          </div>
        </Popup>
      </PopupLayout>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteWallet);
