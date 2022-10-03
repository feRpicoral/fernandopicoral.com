import styled from 'styled-components';

export const Section = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10vh;

    &:last-of-type {
        padding-bottom: 10vh;
    }
`;

export const PageTitle = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 120px;
    line-height: 125px;
    margin: 0;

    @media only screen and (max-width: 600px) {
        font-size: 80px;
    }
`;

export const SectionHeader = styled(PageTitle)`
    font-size: 80px;
    margin-bottom: 55px;

    @media only screen and (max-width: 600px) {
        font-size: 65px;
    }
`;

export const SectionContent = styled.div`
    max-width: 650px;
    min-width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: baseline;
    font-family: ${props => props.theme.fontFamilies.roboto};
    text-align: justify;

    div:not(:last-of-type) {
        margin-bottom: 80px;

        @media only screen and (max-width: 600px) {
            margin-bottom: 70px;
        }
    }

    @media only screen and (min-width: 1020px) {
        min-width: 650px;
    }
`;
