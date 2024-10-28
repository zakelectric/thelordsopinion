import { Box, Typography, Container, Grid, useTheme } from "@mui/material";

import { Link } from "react-router-dom";

import HackText from "../HackText";
import "./Footer.css";

function Footer() {
  const theme = useTheme();

  const footers = [
    {
      title: "Company",
      links: [
        { name: "Home", path: "/" },
        { name: "About", path: "/About" },
        { name: "Contact us", path: "/contact" },
      ],
    },
    {
      title: "Pricing",
      links: [
        { name: "Subscription", path: "/subscription" },
        { name: "Non-Subscription", path: "/nonsubscription" },
        { name: "Enterprise", path: "/enterprise" },
      ],
    },
    {
      title: "Media",
      links: [
        {
          name: "Facebook",
          path: "https://www.facebook.com/media.starside",
        },
        {
          name: "Instagram",
          path: "https://www.instagram.com/starside_media/",
        },
        { name: "Twitter", path: "https://twitter.com/MediaStarside" },
        // { name: "GitHub", path: "https://github.com/hexicidal404" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookies Policy", path: "/cookies" },
        { name: "Contact us", path: "/contact" },
      ],
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: "black",
        borderTop: "1px solid #6a26b1",
        pb: 6,
        mt: 8,
      }}
    >
      <Container
        maxWidth="lg"
        component="footer"
        sx={{
          backgroundColor: "black",
        }}
      >
        <Typography
          variant="h2"
          sx={{ p: 4 }}
        >
          Guideline Gopher
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="space-evenly"
        >
          {footers.map((footer) => (
            <Grid
              item
              xs={6}
              sm={3}
              key={footer.title}
            >
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
              >
                {footer.title}
              </Typography>
              <ul>
                {footer.links.map((linkItem) => (
                  <li key={linkItem.name}>
                    <Link
                      to={linkItem.path}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {linkItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
