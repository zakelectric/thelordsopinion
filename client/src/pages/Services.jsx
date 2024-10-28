import * as React from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import WebIcon from "@mui/icons-material/Web";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import CloudIcon from "@mui/icons-material/Cloud";
import ShareIcon from "@mui/icons-material/Share";
import useMediaQuery from "@mui/material/useMediaQuery";

import SearchIcon from "@mui/icons-material/Search";
import ComputerIcon from "@mui/icons-material/Computer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

import { theme } from "../theme/theme";

const ServicePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  transition: "transform 0.30s ease-in-out",

  border: "solid 5px black",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "12px 12px 2px 1px #131417",
  },
}));

const serviceData = [
  {
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    title: "Web Development",
    description:
      "Custom websites built with the latest technologies to ensure a seamless user experience.",
  },
  {
    icon: <GraphicEqIcon sx={{ fontSize: 40 }} />,
    title: "Graphic Creation",
    description:
      "High-quality graphics designed to enhance your branding and marketing materials.",
  },
  {
    icon: <CloudIcon sx={{ fontSize: 40 }} />,
    title: "Hosting Solutions",
    description:
      "Reliable web hosting services with high uptime and performance metrics.",
  },
  {
    icon: <ShareIcon sx={{ fontSize: 40 }} />,
    title: "Social Media Management",
    description:
      "Strategic social media campaigns to grow your audience and engagement.",
  },
  {
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    title: "Search Engine Optimization, SEO",
    description:
      "Effective strategies to improve your website's visibility in search engine results.",
  },
  {
    icon: <ComputerIcon sx={{ fontSize: 40 }} />,
    title: "Technology Consultation",
    description:
      "Expert advice to help you leverage technology for business growth.",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: "Marketing Solutions",
    description:
      "Innovative marketing approaches to enhance your brand presence and reach.",
  },
  {
    icon: <LoyaltyIcon sx={{ fontSize: 40 }} />,
    title: "Brand Consultation",
    description:
      "Customized branding strategies to create a strong and lasting brand identity.",
  },
  // Add more services as needed
];

export default function Services() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ letterSpacing: "-3px" }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          At Starside Media, we offer a wide range of web development services
          to take your business to the next level.
        </Typography>
        <Grid
          container
          spacing={4}
        >
          {serviceData.map((service, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
            >
              <ServicePaper
                elevation={3}
                sx={{
                  minHeight: 290,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ my: 2 }}>{service.icon}</Box>
                <Typography
                  variant="h6"
                  component="h3"
                >
                  {service.title}
                </Typography>
                <Typography>{service.description}</Typography>
              </ServicePaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
