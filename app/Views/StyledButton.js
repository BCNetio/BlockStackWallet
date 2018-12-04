import styled from "styled-components";

import ArrowLeft from "../images/common/icon-arrow-down.svg";
import IconCrossGrey from "../images/common/icon-cross-grey.svg";
import IconQr from "../images/common/icon-qr.svg";
import IconAdd from "../images/common/icon-add.svg";

/* Classic button */
export const StyledButton = styled.button`
  border: 1px solid #8d96b2;
  border-radius: 14px;
  background: transparent;
  color: #8d96b2;
  padding: 5px 20px;
  margin-right: 5px;
  outline: none;
`;

/* Tap button */
export const TapButton = styled.button`
  border-radius: 0 2px 2px 0;
  background-color: #315efb;
  cursor: pointer;
  border: none;
  height: auto;
  outline: none;
  width: 10%;
  padding: 10px 15px;
  background-image: url(${IconQr});
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  &:active {
    background-color: rgba(241, 241, 241, 0.1);
  }
`;

/* Add button */
export const AddButton = styled.button`
  border: none;
  outline: none;
  height: 49px;
  width: 48px;
  border-radius: 25px;
  box-shadow: 0 15px 28px 0 rgba(0, 0, 0, 0.7);
  background: #315efb url(${IconAdd});
  background-repeat: no-repeat;
  background-position: center;
`;

/* /* Return ( back ) button. Possible states : HoverBase */
export const BackButton = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  margin-right: 5px;
  margin-left: 5px;
  padding: 10px 15px 10px 30px;
  outline: none;
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 10px;
    height: 9px;
    width: 6px;
    background: url(${ArrowLeft}) no-repeat;
    transform: rotate(0deg) translateY(-50%);
  }
  &:hover {
    background: ${props => (props.HoverBase ? "#2B3649" : "#343f53")};
    border-radius: 2px;
  }
`;

/* Popup buttons */
/* close popup */
export const CloseUpButton = styled.button`
  background: transparent url(${IconCrossGrey}) no-repeat center;
  background-size: cover;
  padding: 0;
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  position: absolute;
  top: -30px;
  right: -30px;
`;

/* popup blue button */
export const PopupButton = styled.button`
  background: #315efb;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #f1f1f1;
  border: none;
  padding: 10px 0;
  width: 100%;
  margin-top: 20px;
`;

/* popup grey button */
export const PopupGreyButton = styled.button`
  background: #d2d5e3;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #2b3649;
  border: none;
  padding: 10px 0;
  width: 100%;
  margin-top: 20px;
`;
