import React from "react";
import styled from "styled-components";
import IconManualAddress from "../../images/common/icon-manual-address.svg";

export const InputManualAddressWrapper = styled.div`
  background: #e2e4e8 url(${IconManualAddress}) no-repeat 5% 50%;
  font-size: 10px;
  letter-spacing: 0.230769px;
  color: #2b3649;
`;

const InputForAddres = ({ onClick }) => (
  <InputManualAddressWrapper
    className="input-wrapper"
    id="input"
    onClick={onClick}
  >
    Manual addres input
  </InputManualAddressWrapper>
);

export default InputForAddres;
