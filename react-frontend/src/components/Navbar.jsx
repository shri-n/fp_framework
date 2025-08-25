import React from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Navbar({ mode, setMode }) {
  const { logout } = useAuth();

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/services">Services</Button>
          <Button color="inherit" component={Link} to="/pages">Pages</Button>
          <Button color="inherit" component={Link} to="/schemas">Schemas</Button>
        </Box>
        <Tooltip title="Toggle theme">
          <IconButton
            sx={{ mr: 2 }}
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            color="inherit"
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
