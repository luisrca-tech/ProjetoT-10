import "styled-components";

export type ThemeColors = {
  WHITE: string;
  LIGHT: string;
  GRAY: string;
  DARK: string;
  SUCCESS: string;
  WARNING: string;
  PRIMARY: string;
  ERROR: string;
  SECONDARY: string;
  SECONDARY_LIGHT: string;
  SECONDARY_EXTRA_LIGHT: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    COLORS: ThemeColors;
  }
}
