import ThemeButton from '@components/ThemeButton';
import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: ${props => props.theme.colors.navBackground};
    color: ${props => props.theme.colors.text};
    z-index: 1;
    padding: 30px;
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 30px;
    margin: 0;
`;

export interface NavBarProps {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}

const Navbar = ({ setTheme }: NavBarProps) => (
    <Nav>
        <Logo>picoral</Logo>
        <ThemeButton setTheme={setTheme} />
    </Nav>
);

export default Navbar;
