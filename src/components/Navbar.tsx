import { MenuButton } from '@components/Menu';
import MoonIcon from '@icons/moon.svg';
import SunIconRaw from '@icons/sun.svg';
import darkTheme from '@themes/dark';
import lightTheme from '@themes/light';
import React, { useContext } from 'react';
import styled, { DefaultTheme, ThemeContext } from 'styled-components';

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

const ThemeIconWrapper = styled.div`
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
    width: 20px;
`;

const SunIcon = styled(SunIconRaw)`
    fill: white;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

export interface NavBarProps {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isMenuOpen, setMenuOpen, setTheme }: NavBarProps) => {
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const theme = useContext(ThemeContext);

    const changeTheme = () => {
        if (theme.isDarkMode) {
            setTheme(lightTheme);
        } else {
            setTheme(darkTheme);
        }
    };

    return (
        <Nav>
            <Logo>picoral</Logo>
            <RightSection>
                <ThemeIconWrapper
                    onClick={changeTheme}
                    aria-label={'Toggle dark mode'}
                    title={'Toggle dark mode'}
                >
                    {theme.isDarkMode ? <SunIcon /> : <MoonIcon />}
                </ThemeIconWrapper>
                <MenuButton onClick={toggleMenu} />
            </RightSection>
        </Nav>
    );
};

export default Navbar;
