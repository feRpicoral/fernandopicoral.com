import React from 'react';
import { SWRConfig } from 'swr';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import dark from '@themes/dark';
import { AppProps } from 'next/app';
import axios from 'axios';

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

const swrFetcher = (url: string) =>
    axios({
        url,
        method: 'GET'
    }).then(res => res.data);

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <ThemeProvider theme={dark}>
            <GlobalStyle />
            <SWRConfig value={{ fetcher: swrFetcher }}>
                <Component {...pageProps} />
            </SWRConfig>
        </ThemeProvider>
    </>
);

export default App;
