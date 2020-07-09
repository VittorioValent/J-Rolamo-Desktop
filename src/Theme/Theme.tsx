import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#8b6b61",
      main: "#5d4037",
      dark: "#321911",
    },
    secondary: {
      light: "#e5ffff",
      main: "#b2dfdb",
      dark: "#82ada9",
    },
    text: {
      primary: "#000",
      secondary: "aaa",
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#6a4f4b",
      main: "#3e2723",
      dark: "#1b0000",
    },
    secondary: {
      light: "#819ca9",
      main: "#546e7a",
      dark: "#29434e",
    },
    text: {
      primary: "#fff",
      secondary: "eee",
    },
  },
});
