import { Theme } from '../../../models/theme/theme';

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}
