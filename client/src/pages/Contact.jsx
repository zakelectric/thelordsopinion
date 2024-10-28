import { useState } from "react";

import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Link,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkIcon from "@mui/icons-material/Link";

import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

const ContactPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  border: "solid 5px black",
  "&:hover": {
    boxShadow: "12px 12px 2px 1px #6a26b1",
  },
}));

const ContactForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields({
      ...formFields,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formFields.name) tempErrors.name = "Name is required.";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formFields.email))
      tempErrors.email = "Email is not valid.";
    if (!formFields.message) tempErrors.message = "Message is required.";
    // Add other validations as needed
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!validate()) return;

    try {
      const formData = new FormData(form);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        setSubmissionStatus("submitted");
        form.reset();
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{ py: 5 }}
      >
        <ContactPaper elevation={3}>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Typography
              variant="h2"
              align="center"
              sx={{ letterSpacing: "-1px" }}
            >
              Let's discuss your ideas.
            </Typography>
            <Typography
              variant="h4"
              align="center"
              sx={{ pt: 2 }}
            >
              Tell us about your objectives and we’ll tell you how we can help.
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            data-netlify="true"
            name="contact"
          >
            <input
              type="hidden"
              name="form-name"
              value="contact"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoFocus
              value={formFields.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formFields.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ style: { color: "#fff" } }}
            />

            <TextField
              margin="normal"
              fullWidth
              id="company"
              label="Your Company"
              name="company"
              value={formFields.company}
              onChange={handleInputChange}
              error={!!errors.company}
              helperText={errors.company}
              InputLabelProps={{ style: { color: "#fff" } }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="message"
              label="Your Message"
              name="message"
              value={formFields.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message}
              InputLabelProps={{ style: { color: "#fff" } }}
            />

            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              value={formFields.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputLabelProps={{ style: { color: "#fff" } }}
            />

            <TextField
              margin="normal"
              fullWidth
              select
              id="reason"
              label="Reason for Contact"
              name="reason"
              SelectProps={{ native: true }}
              InputLabelProps={{ style: { color: "#fff" } }}
            >
              {/* Add your options here */}
              <option value="webDevelopment">Web Development</option>
              <option value="uiUxDesign">UI/UX Design</option>
              <option value="eCommerceSolutions">eCommerce Solutions</option>
              <option value="webMaintenance">Website Maintenance</option>
              <option value="seoServices">SEO Services</option>
              <option value="webHosting">Web Hosting</option>
              <option value="contentManagement">Content Management</option>
              <option value="digitalMarketing">Digital Marketing</option>
              <option value="customApplication">
                Custom Application Development
              </option>
              <option value="other">Other</option>
            </TextField>

            <FormControlLabel
              control={
                <Checkbox
                  name="consent"
                  sx={{
                    color: "white",
                    [`&, &.${checkboxClasses.checked}`]: {
                      color: "#fff",
                    },
                  }}
                />
              }
              label={
                <span>
                  I agree to the{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    sx={{ color: "gray" }}
                  >
                    Privacy Policy
                  </Link>
                </span>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, "&:hover": { backgroundColor: "#939fb0" } }}
            >
              Send Message
            </Button>
          </Box>
          {submissionStatus === "submitted" && (
            <Typography variant="body1">
              Thank you for your message. We will get back to you soon!
            </Typography>
          )}
          {submissionStatus === "error" && (
            <Typography
              variant="body1"
              color="error"
            >
              Sorry, there was an error submitting your form. Please try again.
            </Typography>
          )}
        </ContactPaper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mt: 4,
            textAlign: "center",
            border: "solid 5px black",
            display: "flex",
            flexDirection: "row", // Changed to row
            flexWrap: "wrap", // Allow items to wrap
            alignItems: "center",
            justifyContent: "space-around", // Space items evenly
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Location */}

            {/* Email */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MailOutlineIcon sx={{ color: "secondary" }} />
              <Typography variant="body1">
                <Link
                  href="mailto:info@guidelinegopher.com"
                  sx={{ color: "white" }}
                >
                  Info@guidelinegopher.com
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
        {/* <Button
          variant="contained"
          color="primary"
          endIcon={<LinkIcon />}
          href="/contact"
        >
          Contact Us
        </Button> */}
      </Container>
    </ThemeProvider>
  );
};

export default ContactForm;
