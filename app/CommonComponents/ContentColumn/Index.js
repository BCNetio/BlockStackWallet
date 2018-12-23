import styled, { css } from "styled-components";

export const Column = styled.div`

  ${props =>
    props.left &&
    css`
      width: 29%;
      @media (max-width: 1200px) {
        width: 49%;
        height: auto;
      }
      @media (max-width: 992px) {
        width: 100%;
        margin-bottom: 20px;
      }
      @media (max-width: 768px) {
        width: 100%;
        margin-top: 20px;
        margin-right: 0;
      }
    `}

  ${props =>
    props.middle &&
    css`
      width: 39%;
      @media (max-width: 1200px) {
        width: 49%;
        height: auto;
      }
      @media (max-width: 992px) {
        width: 100%;
      }
      @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
      }
    `}

  ${props =>
    props.right &&
    css`
      width: 29%;
      @media (max-width: 1200px) {
        width: 100%;
        margin-top: 20px;
      }
      @media (max-width: 768px) {
        margin-right: 0;
      }
    `}
`;
