import React from "react";
import { Box, Typography, CheckIcon } from "@mui/material";

const SubtitleWord = ({ text, index }) => {
  const delay = `${index * 40}ms`;
  const style = {
    transitionDelay: delay,
    display: "inline-block",
    margin: "0 0.3vmin",
    opacity: 0,
    transform: "translateY(40%)",
    transition:
      "opacity 0ms, transform 200ms cubic-bezier(0.9, 0.06, 0.15, 0.9)",
    "&:hover": {
      opacity: 1,
      transform: "translateY(0%)",
    },
  };
  return <span sx={style}>{text} </span>;
};

const CardSubtitle = ({ phrase }) => {
  const words = phrase.split(" ");
  return (
    <div className="card-subtitle">
      {words.map((word, index) => (
        <SubtitleWord
          key={index}
          text={word}
          index={index}
        />
      ))}
    </div>
  );
};

export default function CardContent() {
  const phrase =
    "But in a much more real sense, I have no idea what I'm doing.";

  return (
    <Box>
      <div className="card-content">
        <div className="card-title">
          <Typography
            variant="h5"
            component="h3"
            align="center"
            fontWeight="bold"
          >
            Standalone Website
          </Typography>
        </div>
        <CardSubtitle phrase={phrase} />
      </div>
      <Box
        mt={2}
        align="center"
      >
        <Typography
          variant="h4"
          component="span"
          fontWeight="bold"
        >
          <CheckIcon sx={{ fontSize: 25 }} /> $29
        </Typography>
        / month
      </Box>
    </Box>
  );
}
