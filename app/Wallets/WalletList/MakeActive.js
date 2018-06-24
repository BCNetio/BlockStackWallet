import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { PopupLayout, PopupButton, CloseUpButton, Popup, TabsWrapper } from '../../Views';
import { updateWalletByWID } from './Actions';
import { recoverWallet } from '../../Providers/Wallets';

const mapDispatchToProps = dispatch => ({
  update: wallet => dispatch(updateWalletByWID(wallet)),
});

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList,
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class MakeActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pKey: '', warning: null };
  }

  changePkey = (e) => {
    this.setState({ pKey: e.currentTarget.value, warning: null });
  };

  updateWallet = () => {
    const currentWallet = this.props.wallets.find( w => w.wid === this.props.options.wid);
    try {
      const { address } = recoverWallet(currentWallet.type, this.state.pKey);
      if (address === currentWallet.address) {
        this.props.update({ ...currentWallet, readOnly: false, privateKey: this.state.pKey });
        this.props.closeModal();
      } else {
        this.setState({ warning: 'Wrong private key!' });
      }
    } catch (e) {
      this.setState({ warning: 'Wrong private key!' });
    }
  };

  render() {
    return (

      <PopupLayout>
        <Popup create>
          <CloseUpButton onClick={this.props.closeModal} />
          <TabsWrapper>
            <AppBar position="static">
              <Tabs onChange={this.switchTab}>
                <Tab label="Read to Write" />
              </Tabs>
            </AppBar>
          </TabsWrapper>
          {(
            <TabContainer>
              <p className="description">
                Please enter the private key to change the wallet state
              </p>
              <FormControl className="select-wrapper" style={{ width: '100%' }}>

                <input
                className="private-key"
                type="text"
                placeholder="Private key"
                value={this.state.pKey}
                onChange={this.changePkey}
              />
              <PopupButton onClick={this.updateWallet}>Read to Write</PopupButton>
          {
            this.state.warning
              ? <span>{this.state.warning}</span>
              : null
          }
              </FormControl>
            </TabContainer>
          )}


        </Popup>
      </PopupLayout>


   );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MakeActive);