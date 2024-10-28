import { useState, useEffect } from "react";

function RandomBackground() {
  const images = [
    "https://res.cloudinary.com/dcgh3ljwk/image/upload/v1697095253/daniel-olah-04RhrsalOmU-unsplash_mjdyhi.jpg",
    "https://res.cloudinary.com/dcgh3ljwk/image/upload/v1697097029/daniel-olah-untkYJw7OfM-unsplash_ddt3bm.jpg",
    "https://res.cloudinary.com/dcgh3ljwk/image/upload/v1697097027/daniel-olah-1nUNsmWfcSk-unsplash_h9rfhu.jpg",
    "https://res.cloudinary.com/dcgh3ljwk/image/upload/v1697097027/daniel-olah-16XJMQ2bTl4-unsplash_iay4o2.jpg",
    // ... add paths to other images as needed
  ];

  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBackgroundImage(randomImage);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "black", // Set the background color to black
        height: "100vh",
        width: "100%",
        backgroundSize: "contain", // Image will resize to fit within the div, preserving its aspect ratio
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
        backgroundPosition: "left", // Ensure the image is centered within the div
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></div>
  );
}

export default RandomBackground;
