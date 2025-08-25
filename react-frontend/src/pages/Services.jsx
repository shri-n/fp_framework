import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
} from "@mui/material";import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ServiceAPI } from '../services/api'



export default function Services({ mode, setMode }) {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();


  // Fake API call (replace with your API URL)
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ServiceAPI.index();
        // keep only id + name
        const mapped = data.map((item) => ({ id: item.id, name: item.name }));
        setRows(mapped);
      } catch (err) {
        console.error("Error fetching services", err);
      }
    }
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/services/${id}`);
  };

  const handleCreate = () => {
    
    navigate(`/services/new`);
  };
  


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Navbar mode={mode} setMode={setMode} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
          {/* Header row with title + button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Services
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ ml: 2 }}
            >
              + Create Service
            </Button>
          </Box>
          
          {/* DataGrid */}
          <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
