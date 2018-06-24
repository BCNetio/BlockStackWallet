import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = {
  card: {
    height: 'auto',
    background:
      'linear-gradient(42.6deg, #2B3649 0%, #342F58 56.09%, #5C1B57 80.31%, #812359 100%)',
    boxShadow: '0 25px 40px 0 rgba(0,0,0,0.3)',
    color: '#FFFFFF',
    fontSize: 12,
    textOverflow: 'ellipsis',
    padding: '20px',
    paddingBottom: '30px',
  },
  text: {
    fontSize: '15px',
    lineHeight: '20px',
  },
};

export const InfoCard = withStyles(styles)(({ classes }) => (
  <Card className={classes.card}>
    <p
      className={classes.text}
    >{`Dappy Wallet is non-custodial universal wallet with decentralised storage powered by Blockstack.

In-app exchange is supported by ShapeShift, it allows to convert mainstream coins and tokens from the to each other in the most intuitive and easiest way.

Dappy Wallet doesn't store or proceed user private key, be sure that you've done the backup. There is no way to restore the key in case of lost it.

Dappy was created by the BC Net Team that trust in crypto and decentralised applications. `}</p>
  </Card>
));
