import React, { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button, TextField } from "@mui/material"
import { functionAPI } from "../services/api"

const FunctionCreateForm = ({ goBack }) => {
  const [functionName, setFunctionName] = useState("")
  const [parameters, setParameters] = useState("{}") // default JSON string
  const [paramError, setParamError] = useState(null)

  const [code, setCode] = useState("# Write your Ruby code here\n")

  const handleSubmit = async () => {
    try {
      // validate JSON before submitting
      let parsedParams = {}
      try {
        parsedParams = JSON.parse(parameters || "{}")
        setParamError(null)
      } catch (e) {
        setParamError("Invalid JSON format")
        return
      }

      const payload = {
        name: functionName,
        parameters: parsedParams,
        code,
      }

      await functionAPI.create(payload)

      alert("Function created successfully!")
      goBack()
    } catch (err) {
      console.error(err)
      alert("Error creating function")
    }
  }

  const handleRun = () => {
    alert(`Running function:\n${functionName}(${parameters})\n\n${code}`)
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "white" }}>
      {/* Left Panel - Config */}
      <div style={{ flex: 1, padding: "1rem", borderRight: "1px solid #ddd" }}>
        <h2>Create Function</h2>

        <TextField
          label="Function Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />

        <div className="param-editor" style={{ marginTop: "1rem" }}>
          <label className="block text-sm font-medium mb-2">
            Parameters (JSON)
          </label>
          <Editor
            height="200px"
            defaultLanguage="json"
            theme="vs-dark"
            value={parameters}
            onChange={(value) => {
              setParameters(value || "{}")
              try {
                JSON.parse(value || "{}")
                setParamError(null)
              } catch {
                setParamError("Invalid JSON format")
              }
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
          {paramError && (
            <p className="text-red-500 text-xs mt-1">{paramError}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Button variant="contained" color="primary" onClick={handleRun}>
            ▶ Run
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            💾 Save
          </Button>
          <Button variant="outlined" onClick={goBack}>
            ⬅ Back
          </Button>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div style={{ flex: 2 }}>
        <Editor
          height="100%"
          defaultLanguage="ruby"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />
      </div>
    </div>
  )
}

export default FunctionCreateForm
