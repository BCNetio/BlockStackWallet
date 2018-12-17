import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  padding: 0 20px;

  @media (max-width: 1200px) {
    align-items: stretch;
    flex-wrap: wrap;
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
    order: 3;
    padding: 0 10px;
  }
`;
