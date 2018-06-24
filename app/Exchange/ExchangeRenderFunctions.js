import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { logos } from '../images';
import { config } from '../AppConfig';

const avCurrencies = wallets =>
  wallets.map(wallet => (
    <MenuItem key={wallet.wid} value={wallet}>
      <img src={logos[wallet.type]} />
      {wallet.address}
    </MenuItem>
  ));

export const CurrencySelect = ({
  open,
  handleOpen,
  handleClose,
  wallet,
  handleChange,
  wallets,
}) => (
  <Select
    open={open}
    onClose={handleClose}
    onOpen={handleOpen}
    value={wallet}
    onChange={handleChange}
    inputProps={{
      name: 'wallet',
      id: 'controlled-open-select',
    }}
  >
    {avCurrencies(wallets)}
  </Select>
);
