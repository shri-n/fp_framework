import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme, CircularProgress, Box} from "@mui/material";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Pages from "./pages/Pages";
import Schemas from "./pages/Schemas";
import ServiceForm from "./forms/ServiceForm";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <CircularProgress />
    </Box>
  );
  }
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#1976d2" : "#90caf9",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        typography: {
          h4: { fontWeight: 600 },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard mode={mode} setMode={setMode} />
              </PrivateRoute>
            }
          > 
          </Route>
          <Route path="services" element={
              <PrivateRoute>
                <Services mode={mode} setMode={setMode}/>
              </PrivateRoute>
            } 
          />
          <Route path="pages" element={<Pages mode={mode} setMode={setMode}/>} />
          <Route path="schemas" element={<Schemas mode={mode} setMode={setMode}/>} />
          {/* <Route path="/services/:id" element={<ServiceForm mode={mode} setMode={setMode} />} /> */}
          <Route path="/services/:id" element={
              <PrivateRoute>
                <ServiceForm mode={mode} setMode={setMode}/>
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
