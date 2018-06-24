import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { v4 } from 'uuid';
import { reverse, has } from 'ramda';
import * as actions from './Actions';
import { Scroll, StyledButton } from '../../Views';
import { TransactionBasicInfo } from './RenderFunctions';

const styles = {
  card: {
    height: 528,
    position: 'relative',
    backgroundColor: '#2B3649',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
    transition: 'background-color 0.7s ease',
  },
  button: {
    color: '#8D96B2',
    margin: '1px',
    borderRadius: '14px',
    borderColor: '#8D96B2',
    fontSize: '12px',
    minHeight: 'auto',
    minWidth: '0',
    padding: '4px 8px',
    letterSpacing: '0.45px',
    lineHeight: '14px',
  },
};

const filters = [
  { btn: 'All', value: 'all' },
  { btn: 'Receive', value: 'received' },
  { btn: 'Send', value: 'sent' },
];

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'all', openedTrx: null };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    has('address', this.props.wallet) && prevProps.wallet.address !== this.props.wallet.address
      ? this.props.fetchTransactions(this.props.wallet.address, this.props.wallet.type)
      : null;
    return prevState;
  }

  onChnageFilter = (filter) => {
    this.setState({ filter });
  };

  filterTransactions = transactions =>
    this.state.filter !== 'all'
      ? transactions.filter(trx => trx.type === this.state.filter)
      : transactions;

  sortTrx = transactions =>
    this.props.wallet.type === 'etc' || this.props.wallet.type === 'bch'
      ? this.filterTransactions(transactions)
      : this.filterTransactions(reverse(transactions));

  openTrxInfo = (index) => {
    this.setState({ openedTrx: index });
  };

  render() {
    return (
      <Card className={this.props.classes.card}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
          }}
        >
          <p style={{ fontSize: '14px' }}>Transactions</p>
          <div>
            {filters.map(filter => (
              <Button
                className={this.props.classes.button}
                onClick={() => this.onChnageFilter(filter.value)}
                key={v4()}
                variant={this.state.filter === filter.value ? 'outlined' : null}
              >
                {filter.btn}
              </Button>
            ))}
          </div>
        </div>
        <Scroll className="scroll-wrapper dark">
          {this.props.transactions && this.props.transactions.length ? (
            this.sortTrx(this.props.transactions).map((trx, index) => (
              <TransactionBasicInfo
                type={this.props.wallet.type}
                key={v4()}
                trx={trx}
                index={index}
                openedTrx={this.state.openedTrx}
                openTrxInfo={this.openTrxInfo}
              />
            ))
          ) : (
            <div style={{ padding: '20px' }}>
              the blockchain explorer temporary unavailable. Your assets are absolutely safe. Please
              try to repeat you request a bit later. Sorry for the inconvenience
            </div>
          )}
        </Scroll>
        <div style={{ position: 'absolute', width: '100%', bottom: '35px', textAlign: 'center' }}>
          <StyledButton>More</StyledButton>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.wallets.wallet.chartData,
  selectedWalletInfo: state.initialPage.selectedWalletInfo,
  wallet: state.wallets.wallet.wallet,
  transactions: state.wallets.wallet.transactions,
});

const mapDispatchToProps = dispatch => ({
  fetchTransactions: (addres, offset) => dispatch(actions.fetchTransactions(addres, offset)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Transactions));
