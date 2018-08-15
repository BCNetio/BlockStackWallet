import React from 'react';
import { head } from 'ramda';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import IconDirection from '../../images/common/icon-direction.svg';
import { makeTransaction } from './Actions';
import { Confirmation, SendBlock, StatusTransaction } from './StepperRenderFunctions';
import { curNames } from '../../AppConfig';

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
    overflow: 'visible',
    minHeight: 315,
    paddingBottom: '20px',
  },
};

const ExchangeWrapper = styled.div`
  @media (max-width: 993px) {
    margin: 0 auto;
  }
`;

const Title = styled.div`
  padding: 20px;
  span {
    font-size: 14px;
    letter-spacing: 0.26px;
    line-height: 16px;
    position: relative;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
      width: 17px;
      height: 17px;
      background-image: url(${IconDirection});
    }
  }
`;

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.isToken = Boolean(curNames[props.wallet.type]);
    this.state = {
      options: { fee: this.calculateMinimalFee(), gasPrice: this.props.gas, gasLimit: '21000' },
      serviceMessage: '',
      optionsIsOpen: false,
      amount: 0,
      receiver: head(this.filterWalletList(props.wallet.type, this.isToken)),
      isOpenOptions: false,
      activeTabId: 1,
      valid: false,
      error: '',
      readOnlyPkey: '',
    };
  }

  componentDidMount() {
    this.setState({ receiver: head(this.filterWalletList(this.props.wallet.type, this.isToken)) });
  }

  changeROP = (e) => {
    this.setState({ readOnlyPkey: e.currentTarget.value });
  };

  calculateMinimalFee = () => this.props.fee;

  validate = (amount) => {
    return true;
  };

  onChangeAmount = (e) => {
    this.setState({ amount: e.target.value });
    this.validate(e.target.value)
      ? this.setState({ error: '', valid: true })
      : this.setState({ error: 'Wrong amount', valid: false });
  };

  handleReciver = (receiver) => {
    this.setState({ receiver });
  };

  filterWalletList = (currency, isToken) =>
    this.props.walletList.reduce((acc, cur) => {
      if (cur.tokens) {
        return [...acc, cur, ...cur.tokens.tokenList.map(t => ({
          ...cur,
          alias: `${cur.alias} ${t.tokenInfo.symbol}`,
          balance: { ...cur.balance, value: t.balance / (10 ** t.tokenInfo.decimals) },
          type: t.tokenInfo.symbol,
          token: t,
          tokens: undefined,
        }))];
      } else {
        return [...acc, cur];
      }
    }, []).filter(wallet =>
      isToken
        ? wallet.type === curNames.ETH || wallet.token !== undefined
        : wallet.type === currency
    );

  changeOptionsValue = (attribute, value) => {
    this.setState({ options: { ...this.state.options, [attribute]: value } });
  };

  onOpenOptions = () => {
    this.setState(({ isOpenOptions }) => ({ isOpenOptions: !isOpenOptions }));
  };

  mountActiveTabs = (tabId) => {
    this.setState({ activeTabId: tabId });
  };

  applyTransaction = () => {
    const wallet = this.props.wallet.readOnly
      ? { ...this.props.wallet, privateKey: this.state.readOnlyPkey }
      : this.props.wallet;
    this.props.makeTransaction(
      wallet,
      [{ key: this.state.receiver.address, amount: Number(this.state.amount) }],
      this.state.options,
    );
    this.mountActiveTabs(3);
  };

  render() {
    return (
      <ExchangeWrapper>
        <Card className={this.props.classes.card}>
          <Title>
            <span className="direction">Send your funds</span>
          </Title>
          <Divider style={{ backgroundColor: 'rgba(141,150,178,0.1)' }} />
          <div>
            {this.state.activeTabId === 1 && (
              <SendBlock
                wallet={this.props.wallet}
                change={this.onChangeAmount}
                amount={this.state.amount}
                isToken={this.isToken}
                wallets={this.filterWalletList(this.props.wallet.type, this.isToken)}
                handleReciver={this.handleReciver}
                receiver={this.state.receiver}
                value={this.state.options}
                options={this.state.options}
                onChange={this.changeOptionsValue}
                onOpenOptions={this.onOpenOptions}
                isOpenOptions={this.state.isOpenOptions}
                mountActiveTabs={() => this.mountActiveTabs(2)}
                valid={this.state.valid}
                error={this.state.error}
                balance={this.props.wallet.balance ? this.props.wallet.balance.value : 0}
                rop={this.state.readOnlyPkey}
                changeROP={this.changeROP}
              />
            )}
            {this.state.activeTabId === 2 && (
              <Confirmation
                wallet={this.props.wallet}
                receiver={this.state.receiver}
                amount={this.state.amount}
                options={this.state.options}
                applyTransaction={this.applyTransaction}
                goBack={() => this.mountActiveTabs(1)}
              />
            )}
            {this.state.activeTabId === 3 && (
              <StatusTransaction
                hash={this.props.hash}
                amount={this.state.amount}
                status={this.props.status}
                wallet={this.props.wallet}
                target={this.state.receiver.address}
              />
            )}
          </div>
        </Card>
      </ExchangeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  walletInfo: state.wallets.wallet.get('walletInfo'),
  walletList: state.wallets.wallet.get('walletList'),
  status: state.wallets.wallet.get('status'),
  hash: state.wallets.wallet.get('trxId'),
  fee: state.fiat.get('fee'),
  gas: state.fiat.get('gas'),
});

const mapDispatchToProps = dispatch => ({
  makeTransaction: (pk, address, recievers) => dispatch(makeTransaction(pk, address, recievers)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Stepper));
