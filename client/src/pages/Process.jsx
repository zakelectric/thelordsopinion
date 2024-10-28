import React, { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const steps = [
  {
    label: "Consultation",
    description:
      "Initial meeting between you and I to understand project needs, scope, and objectives.",
  },
  {
    label: "Scope Outline",
    description:
      "Define the project scope, including timelines, deliverables, and milestones.",
  },
  {
    label: "Cost Analysis",
    description:
      "Provide a detailed cost analysis and budget plan for the project.",
  },
  {
    label: "Design and Prototyping",
    description:
      "Create design mockups and prototypes to visualize the end product.",
  },
  {
    label: "Development",
    description:
      "Begin the coding process, building features and functionalities as outlined.",
  },
  {
    label: "Testing and Quality Assurance",
    description:
      "Conduct thorough testing to ensure functionality, compatibility, and security.",
  },
  {
    label: "Deployment",
    description:
      "Launch the final product, making it live and accessible to users.",
  },
  {
    label: "Post-Launch Support",
    description: "Provide ongoing support and maintenance post-launch.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        transition: "transform 0.30s ease-in-out",
        width: "100%",
        border: "solid 5px black",
      }}
    >
      <Box sx={{ pb: 2 }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant={isMobile ? "h6" : "h5"}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant="body1">{step.description}</Typography>
                <Box sx={{ mb: -1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 2, mr: 1 }}
                  >
                    {index === steps.length - 1 ? (
                      <Link
                        to="../contact"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                        Contact Us
                      </Link>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 2, mr: 1, color: "white" }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Paper>
  );
}
