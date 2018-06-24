import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { makeTransaction } from './Actions';
import { SEND } from './RenderFunctions';
import Stepper from './StepperForSend';

const styles = {
  card: {
    backgroundColor: '#2B3649',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    marginBottom: '20px',
    borderRadius: '2px',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
    transition: 'background-color 0.7s ease',
  },
};

class Operations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sendReceiveSelector: SEND };
  }

  render() {
    return <Stepper wallet={this.props.wallet} />;
  }
}

const mapStateToProps = state => ({
  walletInfo: state.wallets.wallet.walletInfo,
});

const mapDispatchToProps = dispatch => ({
  makeTransaction: (pk, address, recievers) => dispatch(makeTransaction(pk, address, recievers)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Operations));
