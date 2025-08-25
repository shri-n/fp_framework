import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function Dashboard({ mode, setMode }) {
  const location = useLocation();
  const isHome = location.pathname === "/"; // only show Paper on root

  return (
    <div>
      <Navbar mode={mode} setMode={setMode} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {isHome && (
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Box>Welcome to the dashboard!</Box>
          </Paper>
        )}
        {/* Outlet always renders but outside the Dashboard Paper */}
        <Outlet />
      </Container>
    </div>
  );
}
