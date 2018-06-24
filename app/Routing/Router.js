import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserSignedIn } from 'blockstack';
import { ProtectedRoute } from './ProtectedRoute';
import { Initial } from '../InitialPage/Initial';
import { RoutingPanel } from '../CommonComponents/RoutingPanel';
import Wallet from '../Wallets/Wallet/Wallet';
import WalletList from '../Wallets/WalletList';
import Exchange from '../Exchange/Exchange';

import Header from '../InitialPage/Header';

const Router = props => (
  <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
    {isUserSignedIn() && <Header />}
    {isUserSignedIn() && <RoutingPanel />}
    <Switch>
      <Route exact path="/" component={Initial} />
      <ProtectedRoute exact {...props} path="/wallets" Component={WalletList} />
      <ProtectedRoute {...props} path="/wallet/:id" Component={Wallet} />
      <ProtectedRoute {...props} path="/exchange" Component={Exchange} />
      <Route path="/:any" component={Initial} />
    </Switch>
  </div>
);

export default withRouter(connect()(Router));
