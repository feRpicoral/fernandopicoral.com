import dark from '@themes/dark';
import light from '@themes/light';
import { DefaultTheme } from 'styled-components';

export const THEME_LOCAL_STORAGE_KEY = 'theme';

export const DARK_THEME_VALUE = 'dark';
export const LIGHT_THEME_VALUE = 'light';

export const AVAILABLE_THEMES: Readonly<string[]> = [
    DARK_THEME_VALUE,
    LIGHT_THEME_VALUE
];

export function getPreferredTheme(): DefaultTheme {
    const saved = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    const hasThemeSaved = saved !== null && AVAILABLE_THEMES.includes(saved);

    if (
        !hasThemeSaved &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        return dark;
    }

    if (saved === DARK_THEME_VALUE) {
        return dark;
    } else {
        return light;
    }
}
