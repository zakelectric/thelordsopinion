import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle submission
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: isMobile ? 4 : 8 }} // Less margin on mobile devices
    >
      <Paper
        elevation={6}
        sx={{
          padding: isMobile ? 2 : 4, // Less padding on mobile devices
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant={isMobile ? "h6" : "h5"} // Smaller text on mobile devices
        >
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              s
            >
              <Link
                href="#"
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
                padding={1}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{ color: theme.palette.text.primary }}
                padding={1}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
