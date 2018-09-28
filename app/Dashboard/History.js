import React from 'react';
import Card from '@material-ui/core/Card';
import RemoveIcon from '@material-ui/icons/Remove';
import Open from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { head } from 'ramda';
import { Scroll, ScrollableItem } from '../Views';
import { dateToRedeble } from '../Providers/DataNormalization.js';

const styles = {
  card: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#2B3649',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
    transition: 'background-color 0.7s ease',
  },
  button: {
    color: '#fff',
    margin: '1px',
    borderRadius: '30px',
    borderColor: '#fff',
    fontSize: '11px',
    minWidth: '40px',
  },
};

export const TransactionHover = styled.div`
  &:hover {
    .transaction-info {
      background: rgba(141, 150, 178, 0.1);
      div:last-child {
        display: block;
      }
    }
  }
`;

export const TransactionBasicInfo = ({ text, type, date }) => (
  <TransactionHover>
    <ScrollableItem key={v4()} className="transaction-info">
      <div>{dateToRedeble(date)}</div>
      <div>
        <RemoveIcon className="send" /> {head(text.receivers).amount}
        {text.wallet.type.toUpperCase()}
      </div>
      <div>
        <Open />
      </div>
    </ScrollableItem>
  </TransactionHover>
);

const walletCRUD = wallet => (
  <ScrollableItem key={wallet.date} className="transaction-info">
    <div> {dateToRedeble(wallet.date)} </div>
    <div> {wallet.text} </div>
    <div />
  </ScrollableItem>
);

const eventSelector = new Map([
  ['txPerformed', TransactionBasicInfo],
  ['walletCreate', walletCRUD],
]);

const History = ({ dappyHistory }) => (
  <Card style={styles.card}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '25px 20px',
      }}
    >
      <p style={{ fontSize: '14px', margin: '0' }}> Wallets history </p>
    </div>
    <Scroll className="scroll-wrapper dark">
      {dappyHistory.map((event) => {
        const LayoutComponent = eventSelector.get(event.type);
        return LayoutComponent ? <LayoutComponent key={event.date} {...event} /> : null;
      })}
    </Scroll>
  </Card>
);

export default History;
