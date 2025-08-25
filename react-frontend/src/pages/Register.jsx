import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10 }}>
        <Card elevation={6} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              Welcome Back 👋
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }} align="center">
              No account? <Link to="/register">Register</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
