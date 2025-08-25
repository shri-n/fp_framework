import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function Pages({ mode, setMode }) {
  return  (
      <div>
        <Navbar mode={mode} setMode={setMode} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                Pgaes
              </Typography>
            </Paper>
          <Outlet />
        </Container>
      </div>
    );
}



