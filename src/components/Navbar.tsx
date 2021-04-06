import { MenuButton, MenuProps } from '@components/Menu';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
    z-index: 1000;
    padding: 30px;
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 30px;
    margin: 0;
`;

const OverflowClasses = createGlobalStyle`
  .overflow-h {
    overflow: hidden !important;
  }
`;

const Navbar = ({ isOpen, setOpen }: MenuProps) => {
    const toggleMenu = () => {
        setOpen(!isOpen);
        document.body.classList.toggle('overflow-h');
    };

    return (
        <Nav>
            <OverflowClasses />
            <Logo>picoral</Logo>
            <MenuButton onClick={toggleMenu} />
        </Nav>
    );
};

export default Navbar;
