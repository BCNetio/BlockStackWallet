import styled from 'styled-components';


export const TabsWrapper = styled.div`
    header{
        background-color: #FFFFFB;
        box-shadow: none;
        border-bottom: 1px solid #8D96B2;
        button{
            width: auto;
            min-width: auto;
            &:first-child{
                width: 28%;
            }
            &:nth-child(2){
                width: 27%;
            }
            &:last-child{
                width: 45%;
            }
            > span{
                padding: 0;
                > span{
                    padding: 0;
                    span{
                        font-size: 14px;
                        text-align: center;
                        letter-spacing: 0.323077px;
                        color: #2B3649;
                        padding: 0;
                    }
                }
            }
        }
        span[class*="TabIndicator"]{
            background-color: #315EFB;
            height: 4px;
        }
    }
`;
