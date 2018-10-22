import React from 'react';
import Card from '@material-ui/core/Card';
import { has, equals } from 'ramda';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { logos } from '../../images/index';
import { config } from '../../AppConfig';
import LongMenu from './LongMenu';
import CreateNewWallet from './CreateNewWallet';
import { toFiat } from '../../Providers/Wallets';

const styles = {
  card: {
    width: 215,
    height: 125,
    boxSizing: 'border-box',
    backgroundColor: '#2B3649',
    position: 'relative',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    marginRight: '15px',
    marginBottom: '20px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.7s ease',
    '&:hover': {
      backgroundColor: '#465877',
    },
    '@media (max-width: 1000px)': {
      margin: '5px',
    },
  },

  newWallet: {
    width: 215,
    height: 125,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 2,
    color: '#333844',
    cursor: 'pointer',
    marginRight: '15px',
    marginBottom: '20px',
    transition: ' color 0.5s ease',
    '&:hover': {
      color: '#FFFFFF',
      border: 'solid',
    },
    '@media (max-width: 1000px)': {
      margin: '5px',
    },
  },

  logo: {
    width: 40,
    float: 'left',
  },

  plusIcon: {
    fontSize: 60,
    fontWeight: 900,
  },

  cardHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    color: '#FFFFFF',
  },

  cardHeadTypography: {
    color: '#FFFFFF',
    fontSize: '16px',
    marginBottom: '5px',
  },

  createNew: {
    backgroundColor: '#FFFFFF',
    width: 0,
    height: 0,
    margin: '20%',
  },
  longMenu: {
    marginLeft: 'auto',
  },
};

const wlStyles = {
  wallets: {
    display: 'flex',
    flexWrap: 'wrap',
    '@media (max-width: 767px)': {
      margin: '0 auto',
      justifyContent: 'center',
    },
  },
};

const WalletList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) : {
    margin: 0 auto;
    justifycontent: center;
  }
`;

export const TokensDisplay = styled.span`
  font-size: 10px;
  letter-spacing: 0.25px;
  color: #8d96b2;
`;

export const WalletName = styled.p`
  font-size: 16px;
  letter-spacing: 0.4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 15px;
`;

export const ReadOnlyIcon = styled.div`
  position: absolute;
  top: -13px;
  left: -13px;
  svg {
    font-size: 16px;
  }
`;

export const Currency = styled.p`
  font-size: 16px;
  letter-spacing: 0.4px;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

export const Fiat = styled.p`
  color: #8d96b2;
  font-size: 10px;
  letter-ыpacing: 0.25px;
  line-рeight: 11px;
`;

export const WalletCard = withStyles(styles)(
  ({ wid, select, callModal, classes, selectedFiat, wallet }) => {
    console.log(wallet.getIn(['tokens', 'tokenList']), selectedFiat);
    return (
      <Card className={classes.card}>
        <div
          onClick={() => select(wallet)}
          className={classes.cardHead}
          style={{ marginBottom: '20px', position: 'relative' }}
        >
          {wallet.get('readOnly') ? (
            <ReadOnlyIcon>
              <VisibilityOff className={classes.plusIcon} />
            </ReadOnlyIcon>
          ) : null}
          <img
            src={logos[wallet.get('type')]}
            className={classes.logo}
            style={{ marginRight: '15px' }}
            alt={'logo'}
          />
          <div style={{ width: '80%' }}>
            <WalletName>{wallet.get('alias')}</WalletName>
            {equals('eth', wallet.get('type')) && (
              <TokensDisplay>
                Tokens {(wallet.get('tokens') && wallet.getIn(['tokens', 'tokenList']).size) || 0}
              </TokensDisplay>
            )}
          </div>
        </div>
        <LongMenu className={classes.longMenu} wallet={wallet} callModal={callModal} wid={wid} />
        <div onClick={() => select(wallet)}>
          <Currency>
            {wallet.getIn(['balance', 'value'])
              ? `${wallet.getIn(['balance', 'value']).toFixed(9)} ${wallet
                  .get('type')
                  .toUpperCase()}`
              : `0  ${wallet.get('type').toUpperCase()}`}
          </Currency>
          <Fiat>
            {wallet.get('fiat')} {selectedFiat}
          </Fiat>
        </div>
      </Card>
    );
  },
);

export const NewWallet = withStyles(styles)(({ callModal, classes }) => (
  <div className={classes.newWallet} onClick={callModal}>
    <AddIcon className={classes.plusIcon} />
  </div>
));

export const AvaliableWallets = ({ walletList, select, callModal, selectedFiat }) => (
  <WalletList>
    {walletList.map((wallet, idx) => (
      <WalletCard
        key={wallet.get('wid') + idx}
        wallet={wallet}
        callModal={callModal}
        select={() => select(wallet)}
        selectedFiat={selectedFiat}
      />
      ))}
    <NewWallet key={'add'} callModal={() => callModal(CreateNewWallet)} />
  </WalletList>
  );
