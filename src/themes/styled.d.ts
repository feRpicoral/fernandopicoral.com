import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            text: string;
            background: string;
        };
        fontFamilies: {
            roboto: string;
            quicksand: string;
        };
    }
}
