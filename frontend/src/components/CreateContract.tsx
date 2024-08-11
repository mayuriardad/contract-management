import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const CreateContract: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<
    "draft" | "approved" | "active" | "inactive"
  >("draft");
  const [ownerId, setOwnerId] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/contracts", {
        name,
        status,
        ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSnackbarMessage("Contract created successfully!");
      setSnackbarSeverity("success");
      setName("");
      setStatus("draft");
      setOwnerId(0);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create contract.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Create Contract
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as "draft" | "approved" | "active" | "inactive"
            )
          }
          required
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <TextField
          label="Owner ID"
          type="number"
          value={ownerId}
          onChange={(e) => setOwnerId(Number(e.target.value))}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Create Contract
        </Button>
      </Box>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateContract;
