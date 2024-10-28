import React from "react";
import {
  Container,
  Typography,
  Paper,
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

export default function NonSubscription() {
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
          Non-Subscription Web Design Services
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Comprehensive web solutions tailored for long-term success.
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
                Exclusive Benefits of Our Non-Subscription Services
              </Typography>
              <List>
                {[
                  "Multi-page Layout - Versatile and comprehensive website designs.",
                  "Advanced SEO - Boost your visibility and rank higher on search engines.",
                  "Interactive Elements - Engaging features for an enhanced user experience.",
                  "Social Media Integration - Seamless connection with your social platforms.",
                  "Google Analytics Setup - In-depth insights to drive informed decisions.",
                ].map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                href="/contact"
                sx={{ mt: 2 }}
              >
                Contact Us About Non-Subscription Solutions
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
