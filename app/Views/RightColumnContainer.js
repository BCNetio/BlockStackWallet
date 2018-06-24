import styled from 'styled-components';

export const RightColumnContainer = styled.div`
    flex-grow: 1;
    min-width: 290px;
    width: 30%;
    margin-right: 20px;

    @media (max-width: 1200px) {
        max-width: 100%;
        margin-top: 20px;
    }
    @media (max-width: 1000px) {
        min-width: 95%;
        max-width: 95%;
        margin: 0 auto;
        margin-top: 20px;
    }
`;