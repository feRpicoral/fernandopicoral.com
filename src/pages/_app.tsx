import dark from '@themes/dark';
import light from '@themes/light';
import { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

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
  } 
`;

const App = ({ Component, pageProps }: AppProps) => {
    const [theme, setTheme] = useState(light);

    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            setTheme(dark);
        }
        smoothscroll.polyfill();
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default App;
