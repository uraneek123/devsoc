import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e97724",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
