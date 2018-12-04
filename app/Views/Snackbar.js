import styled from "styled-components";
import IconCrossGrey from "../images/common/icon-cross-grey.svg";
import IconCrossWhite from "../images/common/icon-cross-white.svg";

// possible props for snackbars :
// base
// alert
// confirm

// snackbar's example :
// <Snackbar confirm>
//  <p>Ready!</p>
//  <button></button>
// </Snackbar>

export const Snackbar = styled.div`
  min-width: 330px;
  max-width: 550px;
  padding: 15px 20px;
  box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  margin: auto;
  background: ${props =>
    props.base
      ? "#F1F2FA"
      : props.alert
      ? "#C11E0F"
      : props.confirm
      ? "#7AC231"
      : "white"};
  p {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.323077px;
    color: ${props => (props.base ? "#2B3649" : "#F1F1F1")};
  }
  button {
    border: none;
    outline: none;
    cursor: pointer;
    width: 10px;
    height: 10px;
    margin-left: 10px;
    background: transparent
      url(${props => (props.base ? IconCrossGrey : IconCrossWhite)}) no-repeat
      center;
  }
`;
