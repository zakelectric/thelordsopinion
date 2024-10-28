import { createTheme } from "@mui/material/styles";

// Define the theme
export const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#282828", // dark gray for primary
    },
    secondary: {
      main: "#6a26b1", // purple for secondary
    },
    error: {
      main: "#e04335", // red for errors
    },
    warning: {
      main: "#FFA726", // orange for warnings, adjust based on the image
    },
    info: {
      main: "#29B6F6", // light blue for information, adjust based on the image
    },
    success: {
      main: "#66BB6A", // green for success, adjust based on the image
    },
    background: {
      default: "#161616", // very dark gray for the default background
      paper: "#282828", // dark gray for paper elements
    },
    text: {
      primary: "#FFFFFF", // white for primary text
      secondary: "#B0BEC5", // light gray for secondary text
    },
  },
  typography: {
    // Define the typography styles here
    fontFamily: ["Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.125rem",
    },
    body2: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },

  components: {
    // Override styles for specific components as needed
    MuiButton: {
      styleOverrides: {
        root: {
          // Define button styles here
          borderRadius: "8px", // Example border radius
          padding: "10px 20px",
          // Add more styles as needed
        },
      },
    },
    // Add more component overrides as needed
  },
});

export default theme;
