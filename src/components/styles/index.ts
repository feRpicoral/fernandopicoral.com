import React from 'react';
import styled from 'styled-components';

export const Section = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10vh;
`;

export const PageTitle = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 120px;
    line-height: 125px;
    margin: 0;
`;

export const SectionHeader = styled(PageTitle)<{
    onClick: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}>`
    cursor: pointer;
    transition: all 0.1s ease;
    font-size: 80px;
    margin-bottom: 55px;
    :hover {
        font-size: 100px;
    }
`;

export const SectionContent = styled.div<{ open: boolean; height?: number }>`
    max-height: ${props => (props.open ? `${props.height ?? 1000}px` : 0)};
    overflow: hidden;
    transition: max-height 0.8s ease-in-out;
    max-width: 650px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: ${props => props.theme.fontFamilies.roboto};

    div:not(:last-of-type) {
        margin-bottom: 80px;
    }
`;
