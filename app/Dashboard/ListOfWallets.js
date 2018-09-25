import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { logos } from '../images';
import { config } from '../AppConfig';
import CreateNewWallet from '../Wallets/WalletList/CreateNewWallet';
import { toFiat } from '../Providers/Wallets';
import { getIn } from 'immutable';
import { Scroll, ScrollableItem, Filter, InputSearch, AddButton } from '../Views';
import { TokensDisplay } from '../Wallets/WalletList/Views';
import { v4 } from 'uuid';
import { equals } from 'ramda';

const styles = {
  card: {
    height: 475,
    position: 'relative',
    backgroundColor: '#2B3649',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
    transition: 'background-color 0.7s ease',
    overflow: 'visible',
  },
};

const Wallet = ({ wallet, selectWallet, course, selectedFiat }) => (
  <ScrollableItem key={wallet.wid} className="wallet-info" onClick={() => selectWallet(wallet)}>
    <div>
      <img src={logos[wallet.type]} alt={'type'} />
      <div>
        <p>{wallet.alias}</p>
        {equals('eth', wallet.type) && (
        <TokensDisplay>
              Tokens {wallet.tokens !== undefined && wallet.tokens.get('tokenList').size}
        </TokensDisplay>
          )}
      </div>
    </div>
    <div>
      <p className="title">
        {(wallet.balance ? wallet.balance.get('value') : 0).toFixed(5)}{' '}
        {wallet.type.toUpperCase()}
      </p>
      <p className="subtitle">
        {toFiat(
            wallet.balance ? wallet.balance.get('value') : 0,
            getIn(course, [wallet.type.toUpperCase(), selectedFiat.abbr]),
          )}{' '}
        {selectedFiat.abbr}
      </p>
    </div>
  </ScrollableItem>
  );

class ListOfWallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      showZeroBalanced: true,
      searchPattern: '',
    };
  }

  handleSearch = (e) => {
    this.setState({ searchPattern: e.currentTarget.value });
  };

  handleShowZeroBalanced = () => {
    this.setState({ showZeroBalanced: !this.state.showZeroBalanced });
  };

  hideZeroBalanced = (acc, curr) => {
    if (this.state.showZeroBalanced) {
      return [...acc, curr];
    }
    return curr.balance && curr.balance.value ? [...acc, curr] : acc;
  };

  selectWallet = (wallet) => {
    localStorage.setItem('selectWallet', wallet.wid);
    this.props.history.push({
      pathname: `/wallets/${wallet.wid}`,
      state: wallet,
    });
  };

  render() {
    return (
      <Card style={styles.card}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <p style={{ fontSize: '14px', letterSpacing: '0.2625px' }}> My wallets </p>
          <InputSearch
            type="text"
            value={this.state.searchPattern}
            onChange={this.handleSearch}
            placeholder="Search…"
          />
        </div>
        <Scroll className="scroll-wrapper dark">
          <ScrollableItem className="wallet-info">
            <div style={{ width: '80%' }}>
              <label>
                <input
                  className="checkbox"
                  value={this.state.showZeroBalanced}
                  onChange={this.handleShowZeroBalanced}
                  type="checkbox"
                  name="wallets-filter"
                />
                <span className="checkbox-custom" />
                <span className="label" style={{ fontSize: '12px', lineHeight: '14px' }}>
                  Hide zero balance
                </span>
              </label>
            </div>
            <div style={{ width: '20%', textAlign: 'right' }}>
              <Filter />
            </div>
          </ScrollableItem>
          {this.props.wallets
            .reduce(this.hideZeroBalanced, [])
            .filter(
              wallet =>
                wallet
                  .get('alias')
                  .toUpperCase()
                  .includes(this.state.searchPattern.toUpperCase()) ||
                wallet.get('address').includes(this.state.searchPattern),
            )
            .map(wallet => (
              <Wallet
                key={v4()}
                wallet={wallet.toObject()}
                selectWallet={this.selectWallet}
                course={this.props.course}
                selectedFiat={this.props.selectedFiat}
              />
            ))}
        </Scroll>
        <div style={{ position: 'absolute', width: '100%', bottom: '-26px', textAlign: 'center' }}>
          <AddButton
            onClick={() => {
              this.props.callModal(CreateNewWallet, { wallets: this.props.wallets });
            }}
          />
        </div>
      </Card>
    );
  }
}

export default withRouter(ListOfWallets);
