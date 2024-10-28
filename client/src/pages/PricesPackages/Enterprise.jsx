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

export default function Enterprise() {
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
          Enterprise Development Services
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Tailored solutions for large-scale and complex web projects.
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
                Why Opt for Our Enterprise Development Services?
              </Typography>
              <List>
                {[
                  "Unlimited Pages - Comprehensive web structures for extensive needs.",
                  "Advanced SEO - Optimize your digital presence for top search engine rankings.",
                  "Unique Solutions - Customized strategies to fit your specific business requirements.",
                  "Hosted Databases - Reliable and secure database solutions for large data management.",
                  "Social Media Management - Effective handling of your social media platforms to enhance engagement.",
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
                Contact Us About Enterprise Solutions
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
