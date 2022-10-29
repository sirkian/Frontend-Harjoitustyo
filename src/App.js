import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Topbar from "./components/Topbar";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#f5f5f5", contrastText: "#212121" },
    secondary: { main: "#342b36", contrastText: "#60ebb6" },
    text: { primary: "#212121", secondary: "#51c297" },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 15,
          bgcolor: "#e3e1e1",
          minHeight: "100vh",
        }}
      >
        <Topbar />
        <Sidebar />
        <Main />
      </Box>
    </ThemeProvider>
  );
}

export default App;
