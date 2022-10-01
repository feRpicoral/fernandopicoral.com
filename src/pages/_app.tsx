import { getPreferredTheme } from '@themes/helper';
import light from '@themes/light';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import {
    createGlobalStyle,
    DefaultTheme,
    ThemeProvider
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, 
  body {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  body > div:first-child,
  div#__next {
    height: 100%;
  }
  body {
    background-color: ${props => props.theme.colors.background}; 
  }
  * {
    box-sizing: border-box;
    transition: all .2s ease-in-out; // smooth transition when changing theme
    color: ${props => props.theme.colors.text};
  } 
`;

export type PageProps<P = Record<string, never>> = P & {
    setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
};

const App = ({ Component, pageProps }: AppProps) => {
    const [theme, setTheme] = useState(light);

    useEffect(() => {
        setTheme(getPreferredTheme());
        smoothscroll.polyfill();
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} setTheme={setTheme} />
            </ThemeProvider>
        </>
    );
};

export default App;
