import type { Preview } from "@storybook/react";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import GlobalStyles from "../src/styles/global";
import { AuthProvider } from "../src/hooks/useAuth";
import { withReactContext } from "storybook-react-context";
import { theme } from "../src/styles/theme";
/* TODO: update import for your custom theme configurations */
// import { lightTheme, darkTheme } from '../path/to/themes';
/* TODO: replace with your own global styles, or remove */

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds global styles and theme switching support.
    withThemeFromJSXProvider({
      /* Uncomment for theme switching support */
      // themes: {
      //   light: lightTheme,
      //   dark: darkTheme,
      // }
      // defaultTheme: 'light',
      // Provider: ThemeProvider,
      GlobalStyles,
      defaultTheme: "light",
      Provider: ThemeProvider,
      themes: {
        light: theme,
      },
    }),
  ],
};

export default preview;
