import { MenuButton, MenuProps } from '@components/Menu';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    position: fixed;
    top: 0;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 98px;
    background-color: ${props => props.theme.colors.background};
    /* background-color: #f8f8f8; */
    z-index: 1000;
    padding: 30px;
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 30px;
    margin: 0;
`;

const Navbar = ({ isOpen, setOpen }: MenuProps) => (
    <Nav>
        <Logo>picoral</Logo>
        <MenuButton onClick={() => setOpen(!isOpen)} />
    </Nav>
);

export default Navbar;
