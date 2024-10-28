import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme/theme";

export default function Subscription() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
        >
          Starside Subscription Model
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          A flexible and budget-friendly approach for your web design needs.
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            md={8}
          >
            <Paper
              elevation={3}
              sx={{ p: 4, minHeight: 300 }}
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
              >
                Why Choose Our Subscription Model?
              </Typography>
              <List>
                {[
                  "No upfront costs - start your project immediately without financial burden.",
                  "Regular updates and maintenance included, ensuring your website remains cutting-edge.",
                  "Affordable monthly payments that help manage cash flow for your business.",
                  "Adaptable services - upgrade or downgrade as your business needs change.",
                  "Dedicated support and consultancy as part of the subscription.",
                ].map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>{" "}
              <Button
                variant="contained"
                color="primary"
                href="/contact"
                sx={{ mt: 2 }}
              >
                Contact Us About Subscription Solutions
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
