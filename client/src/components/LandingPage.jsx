import { Grid, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";
import Logo from "../assets/resize.png"; // Update the logo to Guideline Gopher's logo

function LandingPage() {
  const commonGridProps = {
    item: true,
    xs: 12,
  };

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/About");
  };

  return (
    <div className="landingContainer">
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
        >
          <img
            src={Logo}
            alt="Guideline Gopher Logo"
          />
        </Grid>

        <Grid
          {...commonGridProps}
          sm={6}
          md={5}
          className="paperGrid"
        >
          <Container
            sx={{ padding: "1rem", textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h1"
              color="text.primary"
              gutterBottom
            >
              Guideline Gopher
            </Typography>
            <Typography variant="h4">
              Navigating Mortgage Guidelines with AI Precision
            </Typography>
            <Typography
              variant="h5"
              paragraph
              style={{ marginTop: "1rem" }}
            >
              Discover the power of AI with Guideline Gopher, your ultimate tool
              for reading and interpreting complex mortgage regulations and
              guidelines. Simplify your workflow and ensure compliance
              effortlessly.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOnClick}
            >
              Learn More
            </Button>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
