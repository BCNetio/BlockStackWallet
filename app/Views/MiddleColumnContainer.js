import styled from 'styled-components';

export const MiddleColumnContainer = styled.div`
  flex-grow: 1;
  min-width: 330px;
  width: 40%;
  margin-right: 20px;

  @media (max-width: 1200px) {
    max-width: 50%;
    height: auto;
  }
    @media (max-width: 1000px) {
        min-width: 95%;
        max-width: 95%;
        margin: 0 auto;
  }
`;