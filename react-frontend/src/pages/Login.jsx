import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      // maybe show result.error
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Typography variant="body2" sx={{ mt: 2 }}>
              No account? <Link to="/register">Register</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
