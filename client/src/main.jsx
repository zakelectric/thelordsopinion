import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";

import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>

    <App />
  </React.StrictMode>
);
