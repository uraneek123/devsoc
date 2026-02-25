import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Navbar from "./components/Navbar";
import SearchToolbar from "./components/SearchToolbar";
import BuildingGrid from "./components/BuildingGrid";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <SearchToolbar />
          <BuildingGrid />
        </div>
      </div>
    </ThemeProvider>
  );
}
