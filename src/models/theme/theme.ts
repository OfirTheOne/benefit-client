export enum Theme {
  dark = 'dark',
  light = 'light'
}

export const themeReverseMap = new Map<Theme, Theme>([
  [Theme.light, Theme.dark],
  [Theme.dark, Theme.light]
]);
