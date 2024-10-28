import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ButtonAppBar from "./components/navbar/ButtonAppBar";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";
import Home from "./pages/Home";
import { Box } from "@mui/material";

import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Subscription from "./pages/PricesPackages/Subscription";
import Enterprise from "./pages/PricesPackages/Enterprise";
import NonSubscription from "./pages/PricesPackages/NonSubscription";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CookieConsent
          location="bottom"
          cookieName="myAwesomeCookieName3"
          expires={999}
          enableDeclineButton
          flipButtons
          overlay
          acceptOnScroll
          acceptOnScrollPercentage={10}
          onAccept={(acceptedByScrolling) => {
            if (acceptedByScrolling) {
              console.log("Accept was triggered by user scrolling");
            } else {
              console.log("Accept was triggered by clicking the Accept button");
            }
          }}
          style={{
            background: "#f5f5f5",
            color: "#333",
            textAlign: "left",
            fontSize: "14px",
            borderTop: "1px solid #eaeaea",
          }}
          buttonStyle={{
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "13px",
            borderRadius: "5px",
            padding: "10px 20px",
            margin: "10px",
          }}
          declineButtonStyle={{
            backgroundColor: "#f44336",
            color: "white",
            fontSize: "13px",
            borderRadius: "5px",
            padding: "10px 20px",
            margin: "10px",
          }}
        >
          We use cookies to improve your experience, analyze site traffic, and
          serve targeted advertisements. By clicking "I accept", you consent to
          our use of cookies.{" "}
          <a
            href="/cookies"
            style={{ textDecoration: "underline" }}
          >
            Learn more
          </a>
        </CookieConsent>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
        >
          <ButtonAppBar />
          <Box flexGrow={1}>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/about"
                element={<About />}
              />
              <Route
                path="/services"
                element={<Services />}
              />
              <Route
                path="/contact"
                element={<Contact />}
              />
              <Route
                path="/portfolio"
                element={<Portfolio />}
              />
              <Route
                path="/portfolio"
                element={<Portfolio />}
              />
              <Route
                path="/pricing"
                element={<Pricing />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/privacy"
                element={<Privacy />}
              />
              <Route
                path="/subscription"
                element={<Subscription />}
              />
              <Route
                path="/enterprise"
                element={<Enterprise />}
              />
              <Route
                path="/Nonsubscription"
                element={<NonSubscription />}
              />
              <Route
                path="/cookies"
                element={<Cookies />}
              />
              <Route
                path="*"
                element={<NotFound />}
              />

              {/* Add a route for a 404 page as well */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
