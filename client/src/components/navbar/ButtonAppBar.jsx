import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";

export default function ButtonAppBar(props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderLink = (text, to, isSignUp = false) => (
    <Button
      color={isSignUp ? "secondary" : "inherit"}
      variant={isSignUp ? "contained" : "text"}
      component={RouterLink}
      to={to}
      sx={{
        margin: isSignUp ? 1 : undefined,
      }}
    >
      {text}
    </Button>
  );

  return (
    <>
      <AppBar
        position="relative"
        {...props}
        sx={{
          backgroundColor: theme.palette.primary.main,
          transition: "background-color 1s ease-in-out",
        }}
      >
        <Toolbar>
          {/* This IconButton is now always visible */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Guideline Gopher
          </Typography>
          {/* These links will only show when the drawer is not open */}
          {!drawerOpen && (
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {renderLink("Home", "/")}
              {renderLink("Pricing", "/pricing")}
              {renderLink("About us", "/about")}
              {renderLink("Contact", "/contact")}
            </Box>
          )}
          {/* These links will always be visible outside the drawer */}
          {renderLink("Log in", "/login")}
          {renderLink("Sign up", "/signup", true)}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/about"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="About" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/pricing"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Pricing" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/contact"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Contact" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/login"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Log in" />
          </ListItemButton>
          <ListItemButton
            component={RouterLink}
            to="/signup"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Sign up" />
          </ListItemButton>
        </List>{" "}
      </Drawer>
    </>
  );
}
