import styled from 'styled-components';

export const Section = styled.section`
    min-height: 80vh;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10vh;
`;

export const Title = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 120px;
    line-height: 125px;
    margin: 0;
`;

export const Header = styled(Title)`
    font-size: 80px;
    margin-bottom: 55px;
`;
