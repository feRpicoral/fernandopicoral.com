import { MenuButton } from '@components/Menu';
import ThemeButton from '@components/ThemeButton';
import React, { useEffect, useState } from 'react';
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
    z-index: 1000;
    padding: 30px;
`;

const Logo = styled.h1`
    font-family: ${props => props.theme.fontFamilies.quicksand};
    font-weight: 300;
    font-size: 30px;
    margin: 0;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;

export interface NavBarProps {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isMenuOpen, setMenuOpen, setTheme }: NavBarProps) => {
    const [width, setWidth] = useState(Number.MAX_SAFE_INTEGER);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const calculateWidth = () => setWidth(window.innerWidth);
        calculateWidth();

        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    return (
        <Nav>
            {width <= 560 ? (
                <ThemeButton setTheme={setTheme} />
            ) : (
                <Logo>picoral</Logo>
            )}
            <RightSection>
                {width >= 560 && <ThemeButton setTheme={setTheme} />}
                <MenuButton onClick={toggleMenu} />
            </RightSection>
        </Nav>
    );
};

export default Navbar;
