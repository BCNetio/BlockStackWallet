import styled from "styled-components";

// Icons
import IconSupport from "../../images/common/icon-support.svg";
import IconArrowDown from "../../images/common/icon-arrow-down.svg";

// Styled
export const WalletsControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 40px;
  color: #fff;
  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    & > input,
    > div {
      margin-bottom: 20px;
    }
  }
`;

export const Filter = styled.div`
  margin-left: 15px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Switcher = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin: 0;
  }
  .text {
    font-size: 12px;
    margin-left: 10px;
    cursor: pointer;
  }
  label {
    display: inline-block;
    vertical-align: middle;
  }
`;
