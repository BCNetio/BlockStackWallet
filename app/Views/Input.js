import styled from 'styled-components';
import IconSearch from '../images/common/icon-search.svg';
import IconManualAddress from '../images/common/icon-manual-address.svg';

export const Input = styled.input`
  border-radius: 2px;
  background-color: #1F2431;
  border: none;
  padding: 10px;
  color: #fff;
  &.light-grey{
    background-color: #E2E4E8;
    width: 100%;
    color: #000;
    padding: 20px 10px;
    font-size: 12px;
    letter-spacing: 0.276923px;
    color: #8D96B2;
  }
`;

export const InputSearch = styled.input`
  border-radius: 2px;
  background-color: #1F2431;
  border: none;
  padding: 10px;
  padding-left: 20px;
  color: #fff;
  position: relative;
  width: 137px;
  background: #273041 url(${IconSearch}) no-repeat 90% 50%;
`;

export const InputManualAddress = styled.input`
  background: #e2e4e8 url(${IconManualAddress}) no-repeat 5% 50%;
  padding: 10px;
  padding-left: 41px;
  border: none;
  outline: none;
`;

export const InputGrey = styled.input`
  border: 1px solid #D5D9E5;
  border-radius: 2px;
  padding: 0 12px;
  height: 31px;
  width: 100%;
  &::-webkit-input-placeholder {
    font-size: 10px;
    letter-spacing: 0.25px;
    color: #8D96B2;
  }
  &::-moz-placeholder {
    font-size: 10px;
    letter-spacing: 0.25px;
    color: #8D96B2;
  }
  &:-ms-input-placeholder {
    font-size: 10px;
    letter-spacing: 0.25px;
    color: #8D96B2;
  }
  &:-moz-placeholder {
    font-size: 10px;
    letter-spacing: 0.25px;
    color: #8D96B2;

  }
  &:not(:first-child){
    margin-top: 10px;
  }
`;