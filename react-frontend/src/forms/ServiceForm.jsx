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
import { ServiceAPI } from "../services/api";

export default function ServiceForm({ mode, setMode }) {
  const { id } = useParams(); // "new" or an ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", parameters: "{}", code: "" });
  const [runResult, setRunResult] = useState(""); // for output display

  const [loading, setLoading] = useState(false);

  // Load service data if editing
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      ServiceAPI.show(id)
        .then((data) => {
          setFormData({
            name: data.name,
            parameters: JSON.stringify(data.parameters || {}, null, 2),
            code: data.code || "",
          });
        })
        .catch((err) => {
          console.error("Error fetching service:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, code: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id === "new") {
        await ServiceAPI.create(formData);
      } else {
        await ServiceAPI.update(id, formData);
      }
      navigate("/services");
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Failed to save service");
    }
  };

   const handleRun = async () => {
    try {
      const parsedParams = JSON.parse(formData.parameters || "{}");
      const result = await ServiceAPI.run(id, parsedParams);
      setRunResult(JSON.stringify(result, null, 2));
    } catch (err) {
      setRunResult("Error: Invalid JSON or run failed");
    }
  };

  return (
    <div>
      <Navbar mode={mode} setMode={setMode} />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
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
              <Button variant="outlined" onClick={() => navigate("/services")}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
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
              {id !== "new" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRun}
                  sx={{ mt: 1 }}
                >
                  Run
                </Button>
              ) }

              {id !== "new" && (
                <TextField
                  label="Run Result"
                  value={runResult}
                  fullWidth
                  margin="normal"
                  multiline
                  minRows={6}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              ) }

              
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
