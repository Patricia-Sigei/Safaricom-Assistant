import { createTheme } from "@mui/material/styles";

const safaricomTheme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
});

export default safaricomTheme;
