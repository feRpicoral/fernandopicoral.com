import React from 'react';
import styled from 'styled-components';

export const Section = styled.section`
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

export const SectionHeader = styled(Header)<{
    onClick: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}>`
    cursor: pointer;
    transition: all 0.2s ease;
    :hover {
        font-size: 100px;
    }
`;

export const SectionContent = styled.div<{ open: boolean }>`
    max-height: ${props => (props.open ? '1000px' : 0)};
    overflow: hidden;
    transition: max-height 0.8s ease-in-out;
`;
