import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";

import { theme } from "../theme/theme";

const tiers = [
  {
    title: "Basic",
    subheader: "For individual professionals",
    price: "$29",
    description: [
      "Access to standard mortgage templates",
      "Basic AI analysis",
      "PDF export",
      "Email support",
      "Data encryption",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
    link: "basic",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "$59",
    description: [
      "All features in Basic",
      "Advanced AI analysis",
      "Custom template support",
      "Priority email support",
      "Collaboration tools",
    ],
    buttonText: "Get Pro",
    buttonVariant: "contained",
    link: "pro",
  },
  {
    title: "Enterprise",
    price: "Contact us",
    description: [
      "Custom AI solutions",
      "API access for integration",
      "Dedicated account manager",
      "24/7 support",
      "Volume-based discount",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "contained",
    link: "enterprise",
  },
];

export default function Pricing() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          sx={{ p: 1 }}
        >
          Ideal for small and medium sizes businesses, all website design and
          creation is bespoke. These are general prices and your needs are
          unique. Therefore, these are only estimates.
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ textAlign: "center", py: 8 }}
      >
        <Grid
          container
          spacing={5}
          justifyContent="center"
        >
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // This ensures that the button is pushed to the bottom
                  backgroundColor: "#16161a",
                  color: "#fff",
                  transition: "transform 0.15s ease-in-out",
                  border: "solid 5px black",

                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "12px 12px 2px 1px #131417",
                    backgroundColor: "#16161a",
                  },

                  mt: tier.title === "Professional" ? -1 : 0, // Adjust margin to align with other cards
                  mb: tier.title === "Professional" ? -1 : 0,
                }}
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader || null}
                  sx={{ backgroundColor: "#7C9EB2" }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h5"
                      color="text.primary"
                    >
                      Intitial Price: {tier.initial}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h5"
                      color="text.primary"
                    >
                      {tier.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    >
                      {tier.title === "Enterprise" ? null : "/mo"}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions sx={{ pb: 1.5 }}>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    sx={{
                      color: "white",
                      border: "solid 5px black",
                      "&:hover": { backgroundColor: "#939fb0" },
                    }}
                    href={`/${tier.link}`}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
