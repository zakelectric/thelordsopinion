import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import { theme } from "../theme/theme"; // Assuming this is tailored for Guideline Gopher

// Information about the Guideline Gopher team or product
const gopherInfo = {
  name: "Guideline Gopher Team",
  role: "AI-Powered Mortgage Solutions",
  image: "path_to_guideline_gopher_image", // Replace with a relevant image path
  description: (
    <Typography
      variant="h5"
      gutterBottom
    >
      Guideline Gopher is an AI-powered tool designed to simplify the complex
      world of mortgage guidelines. Our team of experts in finance, technology,
      and regulatory compliance has collaborated to create a solution that
      streamlines document interpretation, ensuring accuracy and efficiency in
      the mortgage industry.
    </Typography>
  ),
};

export default function AboutUs() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h2"
          gutterBottom
          align="center"
        >
          About Guideline Gopher
        </Typography>

        <Box sx={{ my: 4 }}>
          <Paper
            elevation={3}
            sx={{ p: 2, textAlign: "center", border: "solid 5px black" }}
          >
            <Avatar
              alt={gopherInfo.name}
              src={gopherInfo.image}
              sx={{ width: 120, height: 120, margin: "auto" }}
            />
            <Typography
              variant="h4"
              gutterBottom
            >
              {gopherInfo.name}
            </Typography>
            <Typography variant="h6">{gopherInfo.role}</Typography>
            <Typography sx={{ mt: 2 }}>{gopherInfo.description}</Typography>
          </Paper>
        </Box>

        <Paper
          elevation={3}
          sx={{ p: 2, mt: 4, textAlign: "center", border: "solid 5px black" }}
        >
          <Typography
            variant="h4"
            sx={{ p: 2 }}
          >
            Our Mission
          </Typography>
          <Typography variant="h5">
            At Guideline Gopher, our mission is to revolutionize the way
            mortgage professionals interact with regulatory documents. We
            harness the power of AI to provide a tool that not only reads but
            also interprets complex guidelines, offering insights and
            clarifications. Our commitment is to enhance efficiency, reduce the
            margin for error, and ensure regulatory compliance in the
            ever-changing landscape of the mortgage industry.
          </Typography>
        </Paper>
        {/* Additional sections like Technology, How It Works, Client Testimonials can be added here */}
      </Container>
    </ThemeProvider>
  );
}
