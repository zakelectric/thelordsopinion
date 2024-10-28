import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";

import LogoImage from "../assets/resize.png"; // Update with your logo
import GuidelineGopherImage from "../assets/resize.png"; // Replace with a relevant image for Guideline Gopher

const SectionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  textAlign: "center",
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  backgroundColor: theme.palette.background.paper,
}));

const Logo = styled("img")({
  width: "100px",
  height: "100px",
});

const FeatureCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{ color: "#fff" }}
      >
        <Box
          textAlign="center"
          my={5}
        >
          <Logo
            src={GuidelineGopherImage}
            alt="Guideline Gopher Logo"
          />
          <Typography
            variant="h1"
            mt={2}
          >
            Guideline Gopher
          </Typography>
          <Typography
            variant="h5"
            mt={1}
          >
            Your AI-Powered Mortgage PDF Reader
          </Typography>
        </Box>

        <SectionBox>
          <Typography
            variant="h4"
            gutterBottom
          >
            Transforming Mortgage Processing
          </Typography>
          <Typography
            variant="body1"
            mb={3}
          >
            Guideline Gopher is an innovative solution designed to streamline
            the process of reviewing and understanding mortgage documents.
            Utilizing advanced AI technology, Guideline Gopher quickly reads and
            analyzes mortgage PDFs, providing clear, concise summaries and
            insights.
          </Typography>
        </SectionBox>

        <Grid
          container
          spacing={4}
        >
          {/* Feature 1 */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Quick Analysis
                </Typography>
                <Typography variant="body1">
                  Instantly parse and interpret complex mortgage documents,
                  saving you time and effort.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          {/* Feature 2 */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Accuracy and Clarity
                </Typography>
                <Typography variant="body1">
                  Get accurate and understandable summaries, making mortgage
                  review processes more efficient.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>

          {/* Feature 3 */}
          <Grid
            item
            xs={12}
            md={4}
          >
            <FeatureCard>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  Enhanced Productivity
                </Typography>
                <Typography variant="body1">
                  Empower your team with AI-driven insights, allowing for better
                  decision-making and client service.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>

        <SectionBox>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Start Free Trial
          </Button>
        </SectionBox>

        <Typography
          variant="body2"
          mt={5}
          textAlign="center"
        >
          © 2023 Guideline Gopher. All rights reserved.
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
