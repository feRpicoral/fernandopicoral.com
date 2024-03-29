import { PageTitle, Section } from '@components/styles';
import ArrowIcon from '@icons/arrow.svg';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const IndexSection = styled(Section)`
    min-height: 80vh;
    margin-top: 100px;
`;

const StyledArrow = styled(ArrowIcon)`
    & > path {
        stroke: ${props => props.theme.colors.text};
    }
`;

const MoveUpDown = keyframes`
  0%, 100% {
    bottom: 0;
  }
  50% {
    bottom: 15px;
  }
`;

const ScrollDownWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    animation: ${MoveUpDown} 1.8s linear infinite;

    @media only screen and (max-width: 600px) {
        margin-bottom: 80px;
    }
`;

const ScrollDown = styled.span`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 100;
    font-size: 25px;
    line-height: 24px;
    margin: 0 0 10px 0;
`;

const TitleWrap = styled.div`
    margin-top: 125px;

    @media only screen and (max-width: 600px) {
        margin-top: 75px;
    }
`;

const Subtitle = styled.h2`
    font-family: ${props => props.theme.fontFamilies.roboto};
    font-weight: 100;
    font-size: 30px;
    line-height: 35px;
    margin: 15px 0;

    @media only screen and (max-width: 600px) {
        font-size: 25px;
        margin-top: 0;
    }
`;

const Home = () => (
    <IndexSection>
        <TitleWrap>
            <PageTitle>picoral</PageTitle>
            <Subtitle>i enjoy building things</Subtitle>
        </TitleWrap>
        <ScrollDownWrap>
            <ScrollDown>scroll down</ScrollDown>
            <StyledArrow />
        </ScrollDownWrap>
    </IndexSection>
);

export default Home;
