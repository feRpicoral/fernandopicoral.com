import MobileMenuButton from '@components/mobile-menu/Button';
import ThemeButton from '@components/ThemeButton';
import useWidth from '@hooks/width.hook';
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
    z-index: 1;
    padding: 30px;

    @media only screen and (max-width: 600px) {
        padding: 15px 30px;
    }
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 30px;
    margin: 0;
`;

const RightSection = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export interface NavBarProps {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setTheme, setMenuOpen }: NavBarProps) => {
    const width = useWidth();

    return (
        <Nav>
            <Logo>picoral</Logo>
            <RightSection>
                <ThemeButton setTheme={setTheme} />
                {width <= 1020 && <MobileMenuButton setOpen={setMenuOpen} />}
            </RightSection>
        </Nav>
    );
};

export default Navbar;
