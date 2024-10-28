import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MagicPaper = styled(Paper)(({ theme, isHovered }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  border: "solid 2px white",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  background: isHovered
    ? `linear-gradient(45deg, #6a26b1, #e04335, #FFD700, #2196F3)`
    : "none",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
}));

const AdditionalText = styled(Typography)({
  opacity: 0,
  transform: "translateY(-20px)",
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
});

const HoverMagicPaper = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MagicPaper
      elevation={3}
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="h5">See magic</Typography>
      <AdditionalText
        variant="h6"
        component="div"
        sx={{ padding: 3 }}
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        Before your eyes
      </AdditionalText>
    </MagicPaper>
  );
};

export default HoverMagicPaper;
