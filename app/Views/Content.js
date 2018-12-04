import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  width: 85%;

  @media (max-width: 1200px) {
    align-items: stretch;
    flex-wrap: wrap;
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
