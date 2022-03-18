import MoonIcon from '@icons/moon.svg';
import SunIconRaw from '@icons/sun.svg';
import darkTheme from '@themes/dark';
import lightTheme from '@themes/light';
import React, { useContext } from 'react';
import styled, { DefaultTheme, ThemeContext } from 'styled-components';

const SunIcon = styled(SunIconRaw)`
    fill: white;
`;

const ThemeIconWrapper = styled.div`
    display: inline-block;
    cursor: pointer;
    width: 20px;
`;

export interface ThemeButtonProps {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}

const ThemeButton = ({ setTheme }: ThemeButtonProps) => {
    const theme = useContext(ThemeContext);

    const changeTheme = () => {
        if (theme.isDarkMode) {
            setTheme(lightTheme);
        } else {
            setTheme(darkTheme);
        }
    };

    return (
        <ThemeIconWrapper
            onClick={changeTheme}
            aria-label={'Toggle dark mode'}
            title={'Toggle dark mode'}
        >
            {theme.isDarkMode ? <SunIcon /> : <MoonIcon />}
        </ThemeIconWrapper>
    );
};

export default ThemeButton;
