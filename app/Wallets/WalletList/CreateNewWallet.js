import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import { v4 } from 'uuid';
import { lensPath, view, head } from 'ramda';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import * as actions from './Actions';

import { recoverWallet, walletGenerator } from '../../Providers/Wallets';

import {
  PopupLayout,
  Popup,
  CloseUpButton,
  PopupButton,
  TabsWrapper,
  InputGrey,
} from '../../Views';

import {
  CurrencySelect,
  ButtonControl,
  PrepareToSave,
  WalletTypeSelect,
} from './CreateNewWalletView';
import { updateWalletByAddress } from '../Wallet/Actions';

const CREATE = 0;
const IMPORT = 1;
const TOKENS = 2;

const mapDispatchToProps = dispatch => ({
  deleteWallet: (walletList, wallet) => dispatch(actions.deleteWallet(walletList, wallet)),
  createWallet: (walletList, wType) => dispatch(actions.createWallet(walletList, wType)),
  update: (address, key, value) => dispatch(updateWalletByAddress(address, key, value)),
});

const mapStateToProps = state => ({
  wallets: state.wallets.walletList.walletList,
});

const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);



class CreateNewWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: { name: 'Bitcoin', abbr: 'BTC', sysName: 'btc' },
      open: false,
      hashKey: '',
      wType: { wType: 'Read/Write' },
      walletPreview: null,
      serviceMessage: null,
      value: 0, // active tab
      token: {
        address: '',
        name: '',
        symbol: '',
        decimals: '',
        price: {},
      },
    };
    this.focus = view(lensPath(['options', 'wallets']), props);
  }

  switchTab = (event, value) => {
    this.setState({
      value,
      walletPreview: null,
    });
  };

  handleTokenChange = (target, value) => {
    this.setState({ ...this.state, token: {...this.state.token, [target]: value }});
  };

  saveWallet = () => {
    const wallet =
      this.state.wType.wType === 'Read only'
        ? { ...this.state.walletPreview, privateKey: null, readOnly: true }
        : this.state.walletPreview;
    this.props.createWallet(this.focus ? this.focus : this.props.wallets, wallet);
    setTimeout(() => this.props.history.push({
      pathname: `/wallet/${wallet.wid}`,
      state: wallet,
    }), 1000);
    localStorage.setItem('selectWallet', wallet.wid);
    this.props.closeModal();
  };

  handleChange = (currency) => {
    this.setState({ currency });
  };

  changeWalletType = (wType) => {
    this.setState({ wType });
  };

  isWalletExists = pk =>
    this.props.wallets.find(
      wallet =>
        (wallet.privateKey === pk || wallet.address === pk) && wallet.type === this.state.currency,
    );

  handlePkChange = (event) => {
    this.setState({
      hashKey: event.currentTarget.value,
      serviceMessage: this.isWalletExists(event.currentTarget.value)
        ? 'This wallet already exists in your Dappy!'
        : null,
    });
  };

  generateWallet = () => {
    const wallet = head(walletGenerator([this.state.currency.sysName]));
    this.props.createWallet(this.focus ? this.focus : this.props.wallets, wallet);
    setTimeout(() => this.props.history.push({
      pathname: `/wallet/${wallet.wid}`,
      state: wallet,
    }), 1000);
  };

  recoverWallet = () => {
    if (/^[13n][1-9A-Za-z][^OIl]{20,40}/.test(this.state.hashKey)) {
      this.savePreview({
        privateKey: null,
        address: this.state.hashKey,
        type: this.state.currency,
        date: new Date(),
        wid: v4(),
        readOnly: true,
      });
    } else {
      try {
        this.savePreview(recoverWallet(this.state.currency.sysName, this.state.hashKey));
      } catch (e) {
        this.setState({ serviceMessage: 'Bad private key!' });
      }
    }
  };

  savePreview = (walletPreview) => {
    this.setState({ walletPreview });
  };

  render() {
    const { value } = this.state;
    return (
      <PopupLayout>
        <Popup create>
          <CloseUpButton onClick={this.props.closeModal} />
          <TabsWrapper>
            <AppBar position="static">
              <Tabs value={value} onChange={this.switchTab}>
                <Tab label="Create" />
                <Tab label="Import" />
                <Tab label="Custom Token" />
              </Tabs>
            </AppBar>
          </TabsWrapper>
          {value === CREATE && (
            <TabContainer>
              <p className="description">
                Please select from the list below the cryptocurrency you want to create the new
                wallet. New wallet will appear in the list of your wallets instantly.
              </p>
              <FormControl className="select-wrapper" style={{ width: '100%' }}>
                <CurrencySelect
                  handleChange={this.handleChange}
                  currency={this.state.currency}
                />
                <ButtonControl
                  currency={this.state.currency}
                  pk={this.state.hashKey}
                  generate={this.generateWallet}
                  recover={this.recoverWallet}
                />
                <PrepareToSave
                  serviceMessage={this.state.serviceMessage}
                  walletPreview={this.state.walletPreview}
                  save={this.saveWallet}
                />
              </FormControl>
            </TabContainer>
          )}
          {value === IMPORT && (
            <TabContainer>
              <p className="description">
                Please select the currency name you want to import the existing wallet using the
                private key.
              </p>
              <CurrencySelect handleChange={this.handleChange} currency={this.state.currency} />
              <br />
              <WalletTypeSelect handleChange={this.changeWalletType} wType={this.state.wType} />
              <input
                className="private-key"
                type="text"
                placeholder="Private key"
                value={this.state.hashKey}
                onChange={this.handlePkChange}
              />
              <ButtonControl
                currency={this.state.currency}
                pk={this.state.hashKey}
                recover={this.recoverWallet}
              />
              <PrepareToSave
                serviceMessage={this.state.serviceMessage}
                walletPreview={this.state.walletPreview}
                save={this.saveWallet}
              />
            </TabContainer>
          )}
          {value === TOKENS && (
            <TabContainer>
              <p className="description">
                {`Dappy Wallet allows the customer to register the token that Dappy doesn't support.
                It means that Dappy will locally recognize the contract address and use it for the
                custom token. Token will be added to the token list. You can use it from the token
                list instantly. In order to use custom token please select the blockchain that token
                use: Please fill in the token parameters`}
              </p>
              <CurrencySelect
                handleChange={this.handleTokenChange}
                currency={this.state.currency}
              />
              <InputGrey
                value={this.state.token.address}
                type="text"
                placeholder="Contract address"
                onChange={(e) => this.handleTokenChange('address', e.currentTarget.value)}
              />
              <InputGrey
                value={this.state.token.name}
                type="text"
                placeholder="Name"
                onChange={(e) => this.handleTokenChange('name', e.currentTarget.value)}
              />
              <InputGrey
                value={this.state.token.symbol}
                type="text"
                placeholder="Symbol"
                onChange={(e) => this.handleTokenChange('symbol', e.currentTarget.value)}
              />
              <InputGrey
                value={this.state.token.decimals}
                type="text"
                placeholder="Decimals"
                onChange={(e) => this.handleTokenChange('decimals', e.currentTarget.value) }
              />
              <PopupButton onClick={this.props.closeModal}>Add token to list</PopupButton>
            </TabContainer>
          )}
        </Popup>
      </PopupLayout>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewWallet));
