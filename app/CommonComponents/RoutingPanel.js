import React from 'react';

import DraftsIcon from '@material-ui/icons/Drafts';
import AccountBalance from '@material-ui/icons/AccountBalanceWallet';
import { withStyles } from '@material-ui/core/styles';
import Exchange from '@material-ui/icons/SwapHoriz';

// Import Component
import NavbarWrapper from '../InitialPage/Menu';

const styles = {
  navItem: {
    color: '#FFFFFF',
  },
};

export const RoutingPanel = withStyles(styles)(({ }) => (
  <NavbarWrapper />
));
