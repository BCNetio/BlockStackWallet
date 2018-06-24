import React from 'react';
import config from '../../Providers/config';
import { PopupLayout, CloseUpButton, Popup } from '../../Views';

const QrPopUp = ({ options, closeModal }) => (
  <PopupLayout>
    <Popup style={{  textAlign: 'center' }}>
      <CloseUpButton onClick={closeModal} />
      <img src={config.qr(options.address)} alt={'qr code'} />
    </Popup>
  </PopupLayout>
);

export default QrPopUp;
