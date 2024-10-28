import "./BackgroundVideo.css";
import LandingPage from "./LandingPage";
function BackgroundVideo() {
  return (
    <div className="video-background">
      <video
        playsInline="playsinline"
        autoPlay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source
          src="../background.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <LandingPage />
      </div>
    </div>
  );
}

export default BackgroundVideo;
