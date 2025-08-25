import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import { ServiceAPI } from '../services/api'


export default function ServiceForm({ mode, setMode }) {
  const { id } = useParams(); // "new" or an ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", parameters: "{}", code: "" });
  const [loading, setLoading] = useState(false);

  // Load service data if editing
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name,
            parameters: JSON.stringify({ example: "param" }, null, 2), // fake params
            code: "# Ruby code goes here\nputs 'Hello from service #{id}'",
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, code: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === "new") {
      console.log("Creating service:", formData);
    } else {
      console.log("Updating service:", { id, ...formData });
    }

    navigate("/services");
  };

  const handleRun = () => {
    try {
      const parsedParams = JSON.parse(formData.parameters);
      console.log("Running service with:", { ...formData, params: parsedParams });
      alert("Service executed! Check console for details.");
    } catch (err) {
      alert("Invalid JSON in parameters field");
    }
  };

  return (
    <div>
      <Navbar mode={mode} setMode={setMode} />
      <Container maxWidth="xll" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          {/* Header row: title + buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              {id === "new" ? "Create Service" : "Edit Service"}
            </Typography>
          
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/services")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {id === "new" ? "Create" : "Update"}
              </Button>
            </Box>
          </Box>
          
          {/* The rest of the form (LHS/RHS split) */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* LHS */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <TextField
                label="Service Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Parameters (JSON)"
                name="parameters"
                value={formData.parameters}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                minRows={6}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRun}
                sx={{ mt: 1 }}
              >
                Run
              </Button>
            </Box>
          
            {/* RHS */}
            <Box sx={{ flex: 2 }}>
              <Editor
                height="80vh"
                language="ruby"
                theme={mode === "dark" ? "vs-dark" : "light"}
                value={formData.code}
                onChange={handleEditorChange}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
