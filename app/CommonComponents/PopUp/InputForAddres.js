import React from 'react';
import styled from 'styled-components';
import { InputManualAddress } from '../../Views';
import IconManualAddress from '../../images/common/icon-manual-address.svg';

export const InputManualAddressWrapper = styled.div`
  background: #e2e4e8 url(${IconManualAddress}) no-repeat 5% 50%;
  font-size: 10px;
  letter-spacing: 0.230769px;
  color: #2B3649;
`;

class InputForAddres extends React.Component {
  constructor() {
    super();
    this.state = { address: '', isOpened: false };
  }

  onKeyDown = (e) => {
    if(e.keyCode === 13){
      this.props.handleMenuItemClick({ type: 'addr', address: this.state.address })
    }
  };

  onOpenInput = () => {
    this.setState({ isOpened: true });
  };

  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
  };

  render() {
    return this.state.isOpened ? (
      <InputManualAddress
        type="text"
        value={this.state.address}
        onKeyDown={this.onKeyDown}
        onChange={this.onChangeAddress}
      />
    ) : (
      <InputManualAddressWrapper className="input-wrapper" id="input" onClick={this.onOpenInput}>
        Manual addres input
      </InputManualAddressWrapper>
    );
  }
}

export default InputForAddres;
