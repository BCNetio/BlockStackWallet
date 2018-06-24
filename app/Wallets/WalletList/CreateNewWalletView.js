import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '../../CommonComponents/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { logos } from '../../images';
import { config } from '../../AppConfig';
import { PopupButton } from '../../Views';

const styles = {
  select: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  notification: {
    color: 'red',
  },
};

export const CurrencySelect = ({ currency, handleChange }) => (
  <Select
    selectItem={currency}
    list={Array.from(config.avCurrencyes)}
    config={{ search: true, input: false, type: 'wallet' }}
    handleMenuItemClick={handleChange}
  />
);

export const WalletTypeSelect = ({ wType, handleChange }) => (
  <Select
    selectItem={wType}
    list={[{ wType: 'Read only' }, { wType: 'Read/Write' }]}
    config={{ search: false, input: false, type: 'walletType' }}
    handleMenuItemClick={handleChange}
  />
);

export const PrivateKeyInput = ({ currency, value, handleChange }) =>
  currency ? (
    <TextField
      label="Private key or wallet address"
      helperText="Private key (optional)"
      value={value}
      style={styles.input}
      onChange={handleChange}
      inputProps={{ name: 'privateKey' }}
    />
  ) : null;

const GenerationButton = ({ action, text }) => (
  <PopupButton variant="raised" color="primary" onClick={action}>
    {' '}
    {text}
  </PopupButton>
);

export const ButtonControl = ({ currency, pk, generate, recover }) => {
  if (!currency) {
    return null;
  }
  return pk ? (
    <GenerationButton action={recover} text={'Restore from private key'} />
  ) : (
    <GenerationButton action={generate} text={'Create new wallet'} />
  );
};

const ServiceMessage = ({ text }) => <div style={styles.notification}>{text}</div>;

const WalletPreview = ({ wallet, save }) => (
  <div>
    <div className="key-wrapper">
      {wallet.readOnly ? (
        <div>
          <b>This will be read only wallet!</b>
          <br />
          <br />
        </div>
      ) : null}
      <div>
        <p className="name">private:</p>
        <p className="value">{wallet.privateKey}</p>
      </div>
      <div>
        <p className="name">public:</p>
        <p className="value">{wallet.address}</p>
      </div>
      <div>
        <p className="name">type:</p>
        <p className="value">{wallet.type}</p>
      </div>
      <div>
        <p className="name">dappy id:</p>
        <p className="value">{wallet.wid}</p>
      </div>
    </div>
    <PopupButton variant="raised" color="primary" onClick={save}>
      {' '}
      Save{' '}
    </PopupButton>
  </div>
);

export const PrepareToSave = ({ serviceMessage, walletPreview, save }) => {
  if (!serviceMessage && !walletPreview) {
    return null;
  }
  return serviceMessage ? (
    <ServiceMessage text={serviceMessage} />
  ) : (
    <WalletPreview wallet={walletPreview} save={save} />
  );
};
