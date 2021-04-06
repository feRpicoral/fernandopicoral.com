import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: string;
            background: string;
            navBackground: string;
        };
        fontFamilies: {
            roboto: string;
            quicksand: string;
        };
    }
}
