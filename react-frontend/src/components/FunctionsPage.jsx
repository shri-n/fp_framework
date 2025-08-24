import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { DataGrid } from "@mui/x-data-grid"
import { Button } from "@mui/material"
import { functionAPI } from '../services/api'

const FunctionsPage = ({ goBack, goToCreate }) => {
  const { user, logout } = useAuth()
  const [functions, setFunctions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    debugger
    const fetchFunctions = async () => {
      try {
        const data = await functionAPI.list()
        setFunctions(data)
      } catch (err) {
        console.error("Error fetching functions:", err)
        setFunctions([])
      } finally {
        setLoading(false)
      }
    }
    fetchFunctions()
  }, [])

  const handleEdit = (id) => alert(`Edit function with ID: ${id}`)

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return
    try {
      await functionAPI.delete(id)   // ✅ use wrapper
      setFunctions((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      console.error("Error deleting function:", err)
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="header-content">
          <h1 className="homepage-title">Functions</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user?.name}!</span>
            <Button
              variant="outlined"
              color="secondary"
              onClick={logout}
              style={{ marginLeft: "1rem" }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="homepage-main">
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={goBack}
          >
            ⬅ Back
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={goToCreate}
          >
            + Add Function
          </Button>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={functions}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </div>
      </main>
    </div>
  )
}

export default FunctionsPage
